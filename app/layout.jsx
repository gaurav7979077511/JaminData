import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Vanshawali',
  description: 'Read-only Vanshawali family tree app',
};

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-blue-300"
    >
      <span className="after:absolute after:bottom-1 after:left-3 after:h-px after:w-0 after:bg-blue-400 after:transition-all after:duration-200 hover:after:w-[calc(100%-1.5rem)]">
        {children}
      </span>
    </Link>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-30 border-b border-slate-700/50 bg-slate-950/70 backdrop-blur-xl">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-base font-semibold text-slate-100 sm:text-lg">
              Vanshawali <span className="text-slate-400">(वंशावली)</span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <NavLink href="/">Home</NavLink>
              <div className="group relative">
                <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-indigo-300">
                  Other Views
                </button>
                <div className="invisible absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-700/60 bg-slate-900/95 p-2 opacity-0 shadow-2xl shadow-black/40 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <NavLink href="/views/view1">View 1</NavLink>
                  <NavLink href="/views/view2">View 2</NavLink>
                  <NavLink href="/views/combined">Combined View</NavLink>
                  <NavLink href="/views">Views Index</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
