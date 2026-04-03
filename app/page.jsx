'use client';

import TreeNode from '@/components/TreeNode';
import { useTreeState } from '@/components/useTreeState';
import treeData from '@/data/vanshawali.json';

export default function HomePage() {
  const { expandedIds, toggleNode } = useTreeState(treeData);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Vanshawali (वंशावली)</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Complete family tree visualization with interactive expand/collapse.
        </p>
      </div>

      <div className="mx-auto hidden max-w-4xl md:block">
        <TreeNode node={treeData} expandedIds={expandedIds} toggleNode={toggleNode} />
      </div>

      <div className="mx-auto max-w-xl md:hidden">
        <TreeNode node={treeData} expandedIds={expandedIds} toggleNode={toggleNode} mobile />
      </div>
    </section>
  );
}
