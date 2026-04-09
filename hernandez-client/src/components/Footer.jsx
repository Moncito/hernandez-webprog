import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t-2 border-zinc-200 bg-zinc-900 text-zinc-400">
            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <span className="text-lg font-bold tracking-tight text-zinc-50">
                            Hernandez<span className="text-zinc-500">.</span>
                        </span>
                        <p className="mt-3 text-sm leading-6">
                            A web programming lab project built with React, Tailwind CSS, and React Router.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                            Quick Links
                        </h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <NavLink to="/" className="text-sm transition hover:text-zinc-100">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="text-sm transition hover:text-zinc-100">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/articles" className="text-sm transition hover:text-zinc-100">Articles</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                            Course Info
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>Web Programming</li>
                            <li>National University</li>
                            <li>Lab Activity 3</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-zinc-700 pt-6 text-center text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} Moncito Glenn Hernandez. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
