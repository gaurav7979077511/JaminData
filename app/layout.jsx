import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Vanshawali',
  description: 'Interactive Vanshawali family tree',
};

function NavItem({ href, children }) {
  return (
    <Link href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
      {children}
    </Link>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="font-semibold text-slate-900">
              Vanshawali <span className="text-slate-500">(वंशावली)</span>
            </Link>
            <div className="flex items-center gap-1">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/views">Other Views</NavItem>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">{children}</main>
      </body>
    </html>
  );
}
