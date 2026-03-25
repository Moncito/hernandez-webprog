import Button from '../components/Button';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 inline-block rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-50">
                            Welcome
                        </p>
                        <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
                            Hi, I&apos;m Moncito Glenn Hernandez
                        </h1>
                        <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
                            A passionate web development student at National University. I build modern,
                            responsive web applications using React, Tailwind CSS, and the latest frontend
                            technologies. Explore my work and projects below.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button to="/about" variant="primary">
                                About Me
                            </Button>
                            <Button to="/articles">
                                View Articles
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl shadow-xl">
                        <img
                            src="https://picsum.photos/seed/hero-workspace/600/400"
                            alt="Modern workspace with laptop and code on screen"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* KPI Section */}
            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            At a Glance
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-zinc-900">Quick Overview</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">12+</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Projects Built
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">08</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Technologies Used
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">24</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Lab Activities
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">04</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Semesters In
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Cards */}
            <section className="bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            What I Do
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-zinc-50">Skills &amp; Services</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <article className="group overflow-hidden rounded-2xl bg-zinc-800 transition hover:bg-zinc-700">
                            <div className="overflow-hidden">
                                <img
                                    src="https://picsum.photos/seed/frontend-dev/400/250"
                                    alt="Frontend development illustration"
                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-zinc-50">Frontend Development</h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Building responsive, accessible user interfaces with React, HTML, CSS,
                                    and Tailwind CSS for a seamless user experience.
                                </p>
                            </div>
                        </article>

                        <article className="group overflow-hidden rounded-2xl bg-zinc-800 transition hover:bg-zinc-700">
                            <div className="overflow-hidden">
                                <img
                                    src="https://picsum.photos/seed/ui-design/400/250"
                                    alt="UI/UX design process"
                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-zinc-50">UI/UX Design</h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Crafting clean wireframes and visual layouts with an emphasis on usability,
                                    spacing, and a consistent design system.
                                </p>
                            </div>
                        </article>

                        <article className="group overflow-hidden rounded-2xl bg-zinc-800 transition hover:bg-zinc-700">
                            <div className="overflow-hidden">
                                <img
                                    src="https://picsum.photos/seed/version-ctrl/400/250"
                                    alt="Version control with Git"
                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-zinc-50">Version Control</h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Managing code with Git and GitHub for collaboration, branching strategies,
                                    and clean commit histories.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
