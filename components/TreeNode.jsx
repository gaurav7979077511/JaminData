'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const BRANCH_COLORS = ['#60a5fa', '#34d399', '#a78bfa', '#f472b6', '#f59e0b', '#22d3ee'];

const translationCache = new Map();

function transliterateFallback(name = '') {
  const rules = [
    [/sh/g, 'श'],
    [/ch/g, 'च'],
    [/th/g, 'थ'],
    [/ph/g, 'फ'],
    [/kh/g, 'ख'],
    [/aa/g, 'आ'],
    [/ee/g, 'ई'],
    [/oo/g, 'ऊ'],
    [/a/g, 'अ'],
    [/b/g, 'ब'],
    [/c/g, 'क'],
    [/d/g, 'द'],
    [/e/g, 'ए'],
    [/f/g, 'फ'],
    [/g/g, 'ग'],
    [/h/g, 'ह'],
    [/i/g, 'इ'],
    [/j/g, 'ज'],
    [/k/g, 'क'],
    [/l/g, 'ल'],
    [/m/g, 'म'],
    [/n/g, 'न'],
    [/o/g, 'ओ'],
    [/p/g, 'प'],
    [/q/g, 'क'],
    [/r/g, 'र'],
    [/s/g, 'स'],
    [/t/g, 'त'],
    [/u/g, 'उ'],
    [/v/g, 'व'],
    [/w/g, 'व'],
    [/x/g, 'क्स'],
    [/y/g, 'य'],
    [/z/g, 'ज'],
  ];

  return name
    .toLowerCase()
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      let converted = part;
      rules.forEach(([pattern, output]) => {
        converted = converted.replace(pattern, output);
      });
      return converted.charAt(0).toUpperCase() + converted.slice(1);
    })
    .join('')
    .trim();
}

async function translateToHindi(name) {
  if (!name) return '';
  if (translationCache.has(name)) return translationCache.get(name);

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: name, source: 'en', target: 'hi', format: 'text' }),
    });

    if (response.ok) {
      const data = await response.json();
      const translated = data?.translatedText?.trim();
      if (translated) {
        translationCache.set(name, translated);
        return translated;
      }
    }
  } catch {
    // no-op, fallback below
  }

  const fallback = transliterateFallback(name);
  translationCache.set(name, fallback);
  return fallback;
}

function useHindiName(node) {
  const provided = typeof node?.hindiName === 'string' ? node.hindiName.trim() : '';
  const [hindiName, setHindiName] = useState(provided);

  useEffect(() => {
    let mounted = true;
    if (provided) {
      setHindiName(provided);
      return;
    }

    translateToHindi(node?.name || '').then((value) => {
      if (mounted) setHindiName(value);
    });

    return () => {
      mounted = false;
    };
  }, [node?.name, provided]);

  return hindiName || '—';
}

function NodeCard({ node, id, color, isExpanded, hasChildren, onToggle, registerNode }) {
  const hindiName = useHindiName(node);

  return (
    <div
      ref={(el) => registerNode(id, el)}
      className="group relative min-w-[210px] rounded-xl border border-slate-200/80 bg-slate-50/95 px-4 py-3 shadow-md transition duration-300 hover:scale-105"
    >
      {hasChildren ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-2 h-6 w-6 rounded-md border border-slate-300 bg-white text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          aria-label={isExpanded ? 'Collapse node' : 'Expand node'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      ) : null}

      <div className="mb-2 h-1 w-14 rounded-full" style={{ backgroundColor: color }} />
      <p className="pr-8 text-sm font-bold text-slate-900 sm:text-base">{node.name}</p>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">({hindiName})</p>
    </div>
  );
}

function DesktopNode({ node, id, branchColor, expandedIds, toggleNode, registerNode, depth = 0, animate }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(id);

  return (
    <div className="relative flex flex-col items-center">
      <NodeCard
        node={node}
        id={id}
        color={branchColor}
        isExpanded={isExpanded}
        hasChildren={hasChildren}
        onToggle={() => toggleNode(id)}
        registerNode={registerNode}
      />

      <div
        className={`origin-top overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? 'mt-8 max-h-[6000px] opacity-100' : 'max-h-0 opacity-0'
        } ${animate ? 'translate-y-0' : 'translate-y-1'}`}
      >
        {hasChildren ? (
          <div className="flex items-start justify-center gap-x-10 gap-y-12 px-5">
            {children.map((child, index) => {
              const childId = `${id}-${index}`;
              const color = BRANCH_COLORS[index % BRANCH_COLORS.length];

              return (
                <DesktopNode
                  key={childId}
                  node={child}
                  id={childId}
                  branchColor={depth === 0 ? color : branchColor}
                  expandedIds={expandedIds}
                  toggleNode={toggleNode}
                  registerNode={registerNode}
                  depth={depth + 1}
                  animate={animate}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function collectEdges(node, id, expandedIds, edges = []) {
  const children = Array.isArray(node.children) ? node.children : [];
  if (!expandedIds.has(id) || children.length === 0) return edges;

  children.forEach((child, index) => {
    const childId = `${id}-${index}`;
    const color = BRANCH_COLORS[index % BRANCH_COLORS.length];
    edges.push({ from: id, to: childId, color });
    collectEdges(child, childId, expandedIds, edges);
  });

  return edges;
}

function MobileDirectoryNode({ node, level = 0 }) {
  const hindiName = useHindiName(node);
  const children = Array.isArray(node.children) ? node.children : [];

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2" style={{ marginLeft: `${level * 14}px` }}>
        <p className="text-sm font-semibold text-slate-100">{node.name}</p>
        <p className="text-xs text-slate-400">({hindiName})</p>
      </div>
      {children.length > 0 ? (
        <div className="space-y-2 border-l border-slate-700/70">
          {children.map((child, index) => (
            <MobileDirectoryNode key={`${node.name}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function TreeNode({ node, expandedIds, toggleNode, mobile = false, zoom = 1, animate = false }) {
  const wrapperRef = useRef(null);
  const [connectors, setConnectors] = useState([]);
  const nodeRefs = useRef(new Map());

  const registerNode = (id, element) => {
    if (element) {
      nodeRefs.current.set(id, element);
    } else {
      nodeRefs.current.delete(id);
    }
  };

  const edges = useMemo(() => collectEdges(node, '0', expandedIds), [node, expandedIds]);

  useLayoutEffect(() => {
    if (mobile) return undefined;

    const updateConnectors = () => {
      if (!wrapperRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const next = edges
        .map((edge) => {
          const fromEl = nodeRefs.current.get(edge.from);
          const toEl = nodeRefs.current.get(edge.to);
          if (!fromEl || !toEl) return null;

          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();

          const x1 = fromRect.left + fromRect.width / 2 - wrapperRect.left;
          const y1 = fromRect.bottom - wrapperRect.top;
          const x2 = toRect.left + toRect.width / 2 - wrapperRect.left;
          const y2 = toRect.top - wrapperRect.top;
          const midY = y1 + (y2 - y1) / 2;

          return {
            d: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
            color: edge.color,
          };
        })
        .filter(Boolean);

      setConnectors(next);
    };

    updateConnectors();

    const resizeObserver = new ResizeObserver(updateConnectors);
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    const intervalId = setInterval(updateConnectors, 220);
    window.addEventListener('resize', updateConnectors);

    return () => {
      clearInterval(intervalId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateConnectors);
    };
  }, [edges, mobile, zoom]);

  if (mobile) {
    return <MobileDirectoryNode node={node} />;
  }

  return (
    <div ref={wrapperRef} className="relative mx-auto w-max pb-10 pt-2">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {connectors.map((line, index) => (
          <path
            key={`${line.d}-${index}`}
            d={line.d}
            fill="none"
            stroke={line.color}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        ))}
      </svg>

      <DesktopNode
        node={node}
        id="0"
        branchColor="#93c5fd"
        expandedIds={expandedIds}
        toggleNode={toggleNode}
        registerNode={registerNode}
        animate={animate}
      />
    </div>
  );
}
