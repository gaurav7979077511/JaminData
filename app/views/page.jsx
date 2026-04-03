import Link from 'next/link';

const views = [
  { title: 'View 1', href: '/views/view1' },
  { title: 'View 2', href: '/views/view2' },
  { title: 'Combined View', href: '/views/combined' },
];

export default function ViewsIndexPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100">Other Views</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {views.map((view) => (
          <Link
            key={view.href}
            href={view.href}
            className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-blue-500/60"
          >
            <h2 className="text-lg font-semibold text-slate-100">{view.title}</h2>
            <p className="mt-1 text-sm text-slate-400">Placeholder page ready for future enhancements.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
