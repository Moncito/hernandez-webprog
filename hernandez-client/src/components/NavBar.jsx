import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200',
        isActive
            ? 'text-zinc-900 after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-zinc-900'
            : 'text-zinc-500 hover:text-zinc-900',
    ].join(' ');

const mobileNavLinkClassName = ({ isActive }) =>
    [
        'block rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-200',
        isActive
            ? 'bg-zinc-900 text-zinc-50'
            : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900',
    ].join(' ');

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 shadow-sm backdrop-blur-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                    <img src="/logo.svg" alt="MH Logo" className="h-9 w-9" />
                    <span className="text-lg font-bold tracking-tight text-zinc-900">
                        Hernandez<span className="text-zinc-400">.</span>
                    </span>
                </NavLink>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/auth/signin"
                        className="ml-3 inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-50 transition hover:bg-zinc-700"
                    >
                        Log In
                    </NavLink>
                </nav>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav className="border-t border-zinc-200 bg-white px-5 pb-4 pt-2 md:hidden">
                    <div className="flex flex-col gap-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={mobileNavLinkClassName}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/auth/signin"
                            className="mt-2 block rounded-xl bg-zinc-900 px-4 py-3 text-center text-base font-semibold text-zinc-50 transition-colors duration-200 hover:bg-zinc-700"
                            onClick={() => setMobileOpen(false)}
                        >
                            Log In
                        </NavLink>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default NavBar;
