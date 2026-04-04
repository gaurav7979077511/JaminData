const lineageBranches = [
  {
    title: 'हरगोविंद मांझी (Hargovind Manjhi)',
    accent: 'from-blue-500 to-cyan-400',
    members: [
      'रामजी मांझी → Late Shivshankar Ram → Madan Ram',
      'रामजी मांझी → Late Udeshwar Ram → Dadan Ram, Satyajeet Paswan',
      'रामजी मांझी → Late Baijnath Ram → Manoj Paswan',
      'रामजी मांझी → Bikesh Ram',
    ],
  },
  {
    title: 'बुधनाथ मांझी (Budhnath Manjhi)',
    accent: 'from-teal-500 to-emerald-400',
    members: ['Late Mahavir Manjhi → Late Prakash Manjhi → Krishna Paswan, Sudama Paswan'],
  },
  {
    title: 'प्रिथ्वी मांझी (Prithvi Manjhi)',
    accent: 'from-rose-500 to-orange-400',
    members: [
      'रामेश्वर मांझी → शिवपूजन मांझी, सूरजदेव मांझी',
      'कामेश्वर मांझी → Rituiya, Biguniya, Kago (→ Rinku), Indu, Bimla, Kantiya, Lalti Devi',
    ],
  },
  {
    title: 'रामब्रथ मांझी (Rambrath Manjhi)',
    accent: 'from-violet-500 to-fuchsia-500',
    members: [
      'महेंद्र मांझी → Bhola, Udit, Lalbihari, Suresh families',
      'चंद्रभान मांझी → Swarath, Nandeo, Tusan, Rajkumar, Amardayal, Birbal families',
    ],
  },
];

export default function View1Page() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-blue-400/30 bg-gradient-to-br from-slate-950 via-blue-950/60 to-slate-900 p-8 shadow-2xl shadow-blue-900/20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">Page 1 • Full Vansawali</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Salik Manjhi Vansawali (सालिक मांझी वंशावली)</h1>
        <p className="mt-2 max-w-3xl text-sm text-blue-100/80 sm:text-base">
          Complete family-line overview redesigned in a royal sapphire palette with high contrast cards for clean print-style
          readability.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {lineageBranches.map((branch) => (
          <article key={branch.title} className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <div className={`mb-3 h-1.5 w-20 rounded-full bg-gradient-to-r ${branch.accent}`} />
            <h2 className="text-lg font-semibold text-slate-100">{branch.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {branch.members.map((member) => (
                <li key={member} className="rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2">
                  {member}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
