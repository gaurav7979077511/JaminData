'use client';

import { useMemo, useState } from 'react';
import TreeNode from '@/components/TreeNode';
import { useTreeState } from '@/components/useTreeState';
import treeData from '@/data/vanshawali.json';

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.1;

export default function HomePage() {
  const { expandedIds, toggleNode, expandAll, collapseAll, isAutoAnimating } = useTreeState(treeData);
  const [zoom, setZoom] = useState(1);

  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom]);

  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl">Vanshawali Family Tree</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Explore lineage with branch-colored relationships, smooth transitions, and responsive directory mode.
        </p>
      </div>

      <div className="sticky top-[72px] z-20 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3 backdrop-blur-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-lg bg-blue-500/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Collapse All
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(2))))}
              className="h-9 w-9 rounded-lg border border-slate-600 text-lg text-slate-200 transition hover:bg-slate-800"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(2))))}
              className="h-9 w-9 rounded-lg border border-slate-600 text-lg text-slate-200 transition hover:bg-slate-800"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
            >
              Reset
            </button>
            <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">{zoomLabel}</span>
          </div>
        </div>
        {isAutoAnimating ? <p className="mt-2 text-xs text-slate-400">Preparing interactive mode…</p> : null}
      </div>

      <div className="mx-auto hidden w-full max-w-[1800px] overflow-auto rounded-3xl border border-slate-700/40 bg-slate-950/30 p-8 shadow-2xl shadow-black/30 md:block">
        <div className="flex min-h-[520px] items-start justify-center">
          <div
            className="origin-top transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <TreeNode
              node={treeData}
              expandedIds={expandedIds}
              toggleNode={toggleNode}
              zoom={zoom}
              animate={isAutoAnimating}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700/40 bg-slate-950/30 p-4 md:hidden">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Mobile Directory View</h2>
        <TreeNode node={treeData} expandedIds={expandedIds} toggleNode={toggleNode} mobile />
      </div>
    </section>
  );
}
