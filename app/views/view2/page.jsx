const khata50Summary = [
  ['प्लॉट 181', '92 डिसमिल'],
  ['प्लॉट 238', '20 (नहर) + 18 (सामान्य) = 38 डिसमिल'],
  ['प्लॉट 259', '12 डिसमिल'],
  ['प्लॉट 261', '1 एकड़ 7 डिसमिल'],
  ['प्लॉट 279', '55 डिसमिल'],
  ['प्लॉट 284', '3 एकड़ 24 डिसमिल'],
];

const branchShares = [
  {
    name: 'हरगोविंद मांझी',
    total: '1 एकड़ 63.5 डिसमिल',
    lines: ['प्लॉट 181: 23', 'प्लॉट 238: 4.5', 'प्लॉट 284: 1 एकड़ 36'],
  },
  {
    name: 'बुधनाथ मांझी',
    total: '86.25 डिसमिल',
    lines: ['प्लॉट 259: 3', 'प्लॉट 181: 23', 'प्लॉट 238: 4.5', 'प्लॉट 261: 26.75', 'प्लॉट 284: 29'],
  },
  {
    name: 'प्रिथ्वी मांझी',
    total: '1 एकड़ 49.5 डिसमिल',
    lines: ['प्लॉट 181: 23', 'प्लॉट 238: 4.5', 'प्लॉट 261: 42', 'प्लॉट 284: 80'],
  },
  {
    name: 'रामब्रथ मांझी',
    total: '2 एकड़ 08.75 डिसमिल',
    lines: ['महेंद्र उप-हिस्सा: 88.5 डिसमिल', 'चंद्रभान उप-हिस्सा: 1 एकड़ 20.25 डिसमिल'],
  },
];

export default function View2Page() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-emerald-300/40 bg-gradient-to-br from-emerald-950/70 via-teal-900/60 to-slate-950 p-8 shadow-2xl shadow-emerald-900/20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Page 2 • Khata 50</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Khata 50 ka Batwara (खाता 50 का बटवारा)</h1>
        <p className="mt-2 text-sm text-emerald-100/90">Emerald-clay theme for land partition details with tabular summary + branch-wise raw share blocks.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-emerald-200/30 bg-slate-900/75">
        <table className="min-w-full divide-y divide-emerald-200/20 text-sm">
          <thead className="bg-emerald-300/15 text-emerald-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">प्लॉट संख्या</th>
              <th className="px-4 py-3 text-left font-semibold">रकबा</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/70 text-slate-200">
            {khata50Summary.map(([plot, area]) => (
              <tr key={plot}>
                <td className="px-4 py-3">{plot}</td>
                <td className="px-4 py-3">{area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {branchShares.map((branch) => (
          <article key={branch.name} className="rounded-2xl border border-emerald-300/20 bg-emerald-950/30 p-5">
            <h2 className="text-lg font-semibold text-emerald-100">{branch.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-amber-300">योग: {branch.total}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {branch.lines.map((line) => (
                <li key={line} className="rounded-md border border-emerald-200/20 bg-slate-950/40 px-3 py-2">
                  {line}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
