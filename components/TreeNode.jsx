'use client';

function NodeCard({ node, hasChildren, isExpanded, onToggle, level, mobile = false }) {
  const hindiName = 'हिंदी नाम उपलब्ध नहीं';

  return (
    <div
      className={`group relative rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-900/10 ${
        mobile ? 'pl-4' : 'min-w-[220px]'
      }`}
      style={{ marginLeft: mobile ? `${level * 16}px` : undefined }}
    >
      {hasChildren ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-3 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-indigo-100 hover:text-indigo-700"
          aria-label={isExpanded ? 'Collapse node' : 'Expand node'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      ) : null}

      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">English Name</p>
      <p className="pr-10 text-base font-semibold text-slate-900">{node.name}</p>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">Hindi Name</p>
      <p className="text-sm text-slate-500">{hindiName}</p>
    </div>
  );
}

function DesktopTree({ node, id, level, expandedIds, toggleNode }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(id);

  return (
    <div className="flex flex-col items-center">
      <NodeCard
        node={node}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => hasChildren && toggleNode(id)}
        level={level}
      />

      {hasChildren && isExpanded ? (
        <div className="tree-reveal relative mt-7 flex flex-col items-center">
          <div className="h-6 w-px bg-slate-500/70" />
          <div className="relative flex flex-wrap justify-center gap-x-14 gap-y-10 pt-8">
            {children.length > 1 ? (
              <div className="pointer-events-none absolute left-10 right-10 top-0 h-px rounded-full bg-slate-500/70" />
            ) : null}
            {children.map((child, index) => (
              <div key={`${id}-${index}-${child.name}`} className="relative flex justify-center">
                <div className="pointer-events-none absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-slate-500/70" />
                <DesktopTree
                  node={child}
                  id={`${id}-${index}`}
                  level={level + 1}
                  expandedIds={expandedIds}
                  toggleNode={toggleNode}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileTree({ node, id, level, expandedIds, toggleNode }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(id);

  return (
    <div className="space-y-2">
      <NodeCard
        node={node}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => hasChildren && toggleNode(id)}
        level={level}
        mobile
      />

      {hasChildren && isExpanded ? (
        <div className="tree-reveal space-y-2 border-l border-dashed border-slate-500/60 pl-1">
          {children.map((child, index) => (
            <MobileTree
              key={`${id}-${index}-${child.name}`}
              node={child}
              id={`${id}-${index}`}
              level={level + 1}
              expandedIds={expandedIds}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function TreeNode({ node, id = '0', level = 0, expandedIds, toggleNode, mobile = false }) {
  if (mobile) {
    return <MobileTree node={node} id={id} level={level} expandedIds={expandedIds} toggleNode={toggleNode} />;
  }

  return <DesktopTree node={node} id={id} level={level} expandedIds={expandedIds} toggleNode={toggleNode} />;
}
