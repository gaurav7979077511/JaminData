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
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="text-base font-semibold text-slate-900">
              Vanshawali
            </Link>
            <div className="flex items-center gap-2">
              <NavLink href="/">Home</NavLink>
              <div className="group relative">
                <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                  Other Views
                </button>
                <div className="invisible absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  <NavLink href="/views/view1">View 1</NavLink>
                  <NavLink href="/views/view2">View 2</NavLink>
                  <NavLink href="/views/combined">Combined View</NavLink>
                  <NavLink href="/views">Views Index</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
