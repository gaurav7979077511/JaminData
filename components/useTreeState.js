'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function collectNodeMeta(node, path = '0', level = 0, acc = []) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;

  acc.push({ id: path, level, hasChildren });

  children.forEach((child, index) => {
    collectNodeMeta(child, `${path}-${index}`, level + 1, acc);
  });

  return acc;
}

export function useTreeState(treeData) {
  const nodeMeta = useMemo(() => collectNodeMeta(treeData), [treeData]);
  const expandableIds = useMemo(
    () => nodeMeta.filter((node) => node.hasChildren).map((node) => node.id),
    [nodeMeta],
  );

  const [expandedIds, setExpandedIds] = useState(() => new Set(expandableIds));
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const isAnimatedRef = useRef(false);

  useEffect(() => {
    setExpandedIds(new Set(expandableIds));
    isAnimatedRef.current = false;
    setIsAutoAnimating(true);
  }, [expandableIds]);

  useEffect(() => {
    if (isAnimatedRef.current) return;

    isAnimatedRef.current = true;
    const timers = [];
    const levels = [...new Set(nodeMeta.map((n) => n.level))].sort((a, b) => a - b);

    levels.forEach((level, index) => {
      const timer = setTimeout(() => {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          nodeMeta
            .filter((node) => node.level === level && node.hasChildren && node.level > 0)
            .forEach((node) => next.delete(node.id));
          return next;
        });

        if (index === levels.length - 1) {
          setIsAutoAnimating(false);
        }
      }, 850 + index * 300);

      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [nodeMeta]);

  const toggleNode = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setIsAutoAnimating(false);
  };

  const expandAll = () => {
    setExpandedIds(new Set(expandableIds));
    setIsAutoAnimating(false);
  };

  const collapseAll = () => {
    setExpandedIds(new Set(['0']));
    setIsAutoAnimating(false);
  };

  return {
    expandedIds,
    toggleNode,
    expandAll,
    collapseAll,
    isAutoAnimating,
  };
}
