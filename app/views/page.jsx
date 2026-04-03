import Link from 'next/link';

const views = [
  { title: 'View 1', href: '/views/view1' },
  { title: 'View 2', href: '/views/view2' },
  { title: 'Combined View', href: '/views/combined' },
];

export default function ViewsIndexPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Other Views</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {views.map((view) => (
          <Link
            key={view.href}
            href={view.href}
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">{view.title}</h2>
            <p className="mt-1 text-sm text-slate-600">Placeholder page ready for future enhancements.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
