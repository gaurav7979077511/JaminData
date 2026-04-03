'use client';

import TreeNode from '@/components/TreeNode';
import { useTreeState } from '@/components/useTreeState';
import treeData from '@/data/vanshawali.json';

export default function HomePage() {
  const { expandedIds, toggleNode } = useTreeState(treeData);

  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl">Vanshawali Family Tree</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Explore the lineage in an interactive, structured tree layout with smooth expand/collapse interactions.
        </p>
      </div>

      <div className="mx-auto hidden max-w-[1600px] overflow-x-auto rounded-3xl border border-slate-700/40 bg-slate-950/30 p-8 shadow-2xl shadow-black/30 md:block">
        <TreeNode node={treeData} expandedIds={expandedIds} toggleNode={toggleNode} />
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700/40 bg-slate-950/30 p-4 md:hidden">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Mobile List View</h2>
        <TreeNode node={treeData} expandedIds={expandedIds} toggleNode={toggleNode} mobile />
      </div>
    </section>
  );
}
