'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const BRANCH_COLORS = ['#3b82f6', '#22c55e', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];
const MIN_SCALE = 0.6;
const MAX_SCALE = 1.8;
const SCALE_STEP = 0.1;

function getNodeId(node, fallbackId) {
  return node?.id ?? fallbackId;
}

function collectExpandableNodes(node, path = '0', acc = []) {
  const nodeId = getNodeId(node, path);
  const children = Array.isArray(node?.children) ? node.children : [];

  if (children.length > 0) {
    acc.push(nodeId);
  }

  children.forEach((child, index) => {
    collectExpandableNodes(child, `${path}-${index}`, acc);
  });

  return acc;
}

function buildVisibleEdges(node, expandedNodes, path = '0', branchColor = BRANCH_COLORS[0], edges = []) {
  const nodeId = getNodeId(node, path);
  const children = Array.isArray(node?.children) ? node.children : [];

  if (!expandedNodes.has(nodeId) || children.length === 0) {
    return edges;
  }

  children.forEach((child, index) => {
    const childId = getNodeId(child, `${path}-${index}`);
    const color = BRANCH_COLORS[index % BRANCH_COLORS.length] ?? branchColor;

    edges.push({ from: nodeId, to: childId, color });
    buildVisibleEdges(child, expandedNodes, `${path}-${index}`, color, edges);
  });

  return edges;
}

function TreeNode({
  node,
  path,
  branchColor,
  expandedNodes,
  onToggle,
  registerNode,
}) {
  const nodeId = getNodeId(node, path);
  const children = Array.isArray(node?.children) ? node.children : [];
  const isExpanded = expandedNodes.has(nodeId);
  const hasChildren = children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div
        ref={(element) => registerNode(nodeId, element)}
        className="group relative min-w-[180px] rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition-transform duration-200 hover:scale-105"
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(nodeId)}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            aria-label={isExpanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
          >
            {isExpanded ? '−' : '+'}
          </button>
        ) : null}

        <div className="mb-2 h-1.5 w-12 rounded-full" style={{ backgroundColor: branchColor }} />
        <p className="pr-7 font-semibold text-gray-800">{node?.name ?? 'Unknown'}</p>
        <p className="text-sm text-gray-500">{node?.hindiName ?? '—'}</p>
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${isExpanded ? 'mt-8 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          {hasChildren ? (
            <div className="flex items-start justify-center gap-8 px-2 pb-2">
              {children.map((child, index) => {
                const childColor = BRANCH_COLORS[index % BRANCH_COLORS.length] ?? branchColor;
                return (
                  <TreeNode
                    key={getNodeId(child, `${path}-${index}`)}
                    node={child}
                    path={`${path}-${index}`}
                    branchColor={childColor}
                    expandedNodes={expandedNodes}
                    onToggle={onToggle}
                    registerNode={registerNode}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileListNode({ node, depth = 0 }) {
  const children = Array.isArray(node?.children) ? node.children : [];
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200" style={{ marginLeft: depth * 14 }}>
        <p className="font-semibold text-gray-800">{node?.name ?? 'Unknown'}</p>
        <p className="text-sm text-gray-500">{node?.hindiName ?? '—'}</p>
      </div>
      {children.length > 0 ? (
        <div className="space-y-2 border-l border-slate-300 pl-2">
          {children.map((child, index) => (
            <MobileListNode key={getNodeId(child, `${depth}-${index}`)} node={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function VanshawaliTree({ data }) {
  const nodeRefMap = useRef(new Map());
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);

  const expandableNodeIds = useMemo(() => collectExpandableNodes(data), [data]);
  const rootId = getNodeId(data, '0');

  const [expandedNodes, setExpandedNodes] = useState(() => new Set(expandableNodeIds));
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    setExpandedNodes(new Set(expandableNodeIds));
  }, [expandableNodeIds]);

  const registerNode = (id, element) => {
    if (element) nodeRefMap.current.set(id, element);
    else nodeRefMap.current.delete(id);
  };

  const visibleEdges = useMemo(
    () => buildVisibleEdges(data, expandedNodes, '0', BRANCH_COLORS[0]),
    [data, expandedNodes],
  );

  useEffect(() => {
    const updateEdges = () => {
      if (!canvasRef.current) return;
      const canvasBounds = canvasRef.current.getBoundingClientRect();

      const nextEdges = visibleEdges
        .map((edge) => {
          const fromEl = nodeRefMap.current.get(edge.from);
          const toEl = nodeRefMap.current.get(edge.to);
          if (!fromEl || !toEl) return null;

          const from = fromEl.getBoundingClientRect();
          const to = toEl.getBoundingClientRect();

          const x1 = from.left + from.width / 2 - canvasBounds.left;
          const y1 = from.bottom - canvasBounds.top;
          const x2 = to.left + to.width / 2 - canvasBounds.left;
          const y2 = to.top - canvasBounds.top;
          const midY = y1 + (y2 - y1) / 2;

          return {
            id: `${edge.from}-${edge.to}`,
            path: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
            color: edge.color,
          };
        })
        .filter(Boolean);

      setEdges(nextEdges);
    };

    updateEdges();

    const resizeObserver = new ResizeObserver(updateEdges);
    if (canvasRef.current) resizeObserver.observe(canvasRef.current);
    nodeRefMap.current.forEach((element) => resizeObserver.observe(element));

    window.addEventListener('resize', updateEdges);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateEdges);
    };
  }, [visibleEdges, scale, offset]);

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const expandAll = () => setExpandedNodes(new Set(expandableNodeIds));
  const collapseAll = () => setExpandedNodes(new Set([rootId]));

  const onMouseDown = (event) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX - offset.x, y: event.clientY - offset.y });
  };

  const onMouseMove = (event) => {
    if (!isDragging) return;
    setOffset({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
  };

  const stopDragging = () => setIsDragging(false);

  const updateScale = (direction) => {
    setScale((prev) => {
      const next = direction === 'in' ? prev + SCALE_STEP : prev - SCALE_STEP;
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(next.toFixed(2))));
    });
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={expandAll} className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white">
            Expand All
          </button>
          <button type="button" onClick={collapseAll} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            Collapse All
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => updateScale('in')} className="h-9 w-9 rounded-lg bg-slate-100 text-lg text-slate-700">
            +
          </button>
          <button type="button" onClick={() => updateScale('out')} className="h-9 w-9 rounded-lg bg-slate-100 text-lg text-slate-700">
            -
          </button>
          <button type="button" onClick={resetView} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            Reset
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="rounded-xl bg-slate-100 p-3 text-sm font-medium text-slate-600">Mobile list view</div>
        <div className="mt-3 space-y-3">
          <MobileListNode node={data} />
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`relative hidden h-[75vh] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 md:block ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div
          className="absolute left-1/2 top-8 origin-top transition-transform duration-200"
          style={{ transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px) scale(${scale})` }}
        >
          <div ref={canvasRef} className="relative inline-flex flex-col items-center pb-8">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              {edges.map((edge) => (
                <path
                  key={edge.id}
                  d={edge.path}
                  stroke={edge.color ?? '#cbd5f5'}
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />
              ))}
            </svg>

            <TreeNode
              node={data}
              path="0"
              branchColor={BRANCH_COLORS[0]}
              expandedNodes={expandedNodes}
              onToggle={toggleNode}
              registerNode={registerNode}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
