const khata96Summary = [
  ['239', '95 डिसमिल'],
  ['228', '165 डिसमिल (1 एकड़ 65 डिसमिल)'],
  ['218', '12 डिसमिल'],
  ['217', '29 डिसमिल'],
  ['212', '24 डिसमिल'],
  ['213', '99 डिसमिल'],
  ['515', '50 डिसमिल'],
  ['517', '61 डिसमिल'],
  ['519', '42 डिसमिल'],
  ['520', '20 डिसमिल'],
  ['479', '33 डिसमिल'],
  ['478', '19 डिसमिल'],
  ['1040', '31 डिसमिल (सबकी बिक्री)'],
  ['1086', '34 डिसमिल (बेचा गया)'],
  ['1087', '33 डिसमिल (बेचा गया)'],
  ['1089', '4 डिसमिल (बेचा गया)'],
  ['1090', '45 डिसमिल'],
];

const khata96Branches = [
  {
    name: 'हरगोविंद मांझी',
    detail: 'रामजी मांझी लाइन: प्लॉट 239 (हिस्सा), 213 (99), 517 (हिस्सा)',
  },
  {
    name: 'बुधनाथ मांझी',
    detail: 'प्रकाश मांझी लाइन: प्लॉट 479 (33), 1090 (45)',
  },
  {
    name: 'प्रिथ्वी मांझी',
    detail: 'कामा + रामेश्वर लाइन: प्लॉट 239, 218, 217, 515, 517, 478',
  },
  {
    name: 'महेंद्र मांझी',
    detail: '228:16, 212:24, 519:42, समायोजन +19.625, प्लॉट 1040 +3.875, अंतिम 1 एकड़ 5.5',
  },
  {
    name: 'चंद्रभान मांझी',
    detail: '228:30, 520:20, समायोजन +19.625, प्लॉट 1040 +3.875, अंतिम 73.5 डिसमिल',
  },
];

export default function CombinedViewPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-fuchsia-300/40 bg-gradient-to-br from-fuchsia-950/70 via-purple-900/70 to-rose-950/70 p-8 shadow-2xl shadow-fuchsia-900/20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">Page 3 • Khata 96</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Khata 96 ka Batwara (खाता 96 का बटवारा)</h1>
        <p className="mt-2 text-sm text-fuchsia-100/90">
          Distinct royal-magenta palette for the third page, focused on sale-adjusted shares and branch-level settlement.
        </p>
      </div>

      <div className="rounded-2xl border border-fuchsia-300/30 bg-slate-900/75 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-200">कुल रकबा: 7 एकड़ 96 डिसमिल</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {khata96Summary.map(([plot, area]) => (
            <div key={plot} className="rounded-lg border border-fuchsia-200/20 bg-fuchsia-950/20 px-3 py-2">
              <p className="text-xs text-fuchsia-200">प्लॉट {plot}</p>
              <p className="text-sm text-slate-100">{area}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {khata96Branches.map((item, idx) => (
          <article
            key={item.name}
            className={`rounded-2xl border p-5 ${idx > 2 ? 'border-rose-300/30 bg-rose-950/30' : 'border-purple-300/30 bg-purple-950/30'}`}
          >
            <h2 className="text-lg font-semibold text-white">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-200">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
