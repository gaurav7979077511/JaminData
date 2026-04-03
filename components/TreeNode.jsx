'use client';

function NodeCard({ node, hasChildren, isExpanded, onToggle, level, mobile = false }) {
  const hindiName = 'हिंदी नाम उपलब्ध नहीं';

  return (
    <div
      className={`relative rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md ${
        mobile ? 'pl-3' : 'pl-4'
      }`}
      style={{ marginLeft: mobile ? `${level * 14}px` : undefined }}
    >
      {hasChildren ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-3 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
          aria-label={isExpanded ? 'Collapse node' : 'Expand node'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      ) : null}

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">English Name</p>
      <p className="pr-10 text-base font-semibold text-slate-900">{node.name}</p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">Hindi Name</p>
      <p className="text-sm text-slate-700">{hindiName}</p>
    </div>
  );
}

export default function TreeNode({ node, id = '0', level = 0, expandedIds, toggleNode, mobile = false }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(id);

  return (
    <div className={`${mobile ? 'space-y-2' : 'space-y-3'}`}>
      <NodeCard
        node={node}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => hasChildren && toggleNode(id)}
        level={level}
        mobile={mobile}
      />

      {hasChildren && isExpanded ? (
        <div
          className={`${
            mobile ? 'space-y-2' : 'ml-8 space-y-3 border-l border-dashed border-slate-300 pl-4'
          } transition-all duration-300`}
        >
          {children.map((child, index) => (
            <TreeNode
              key={`${id}-${index}-${child.name}`}
              node={child}
              id={`${id}-${index}`}
              level={level + 1}
              expandedIds={expandedIds}
              toggleNode={toggleNode}
              mobile={mobile}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
