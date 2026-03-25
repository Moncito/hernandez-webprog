import Button from '../components/Button';

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-8">
            {/* About Hero */}
            <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
                    <div className="overflow-hidden rounded-3xl shadow-xl">
                        <img
                            src="https://picsum.photos/seed/about-profile/600/500"
                            alt="Student developer portrait"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div>
                        <p className="mb-3 inline-block rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-50">
                            About Me
                        </p>
                        <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
                            Moncito Glenn N. Hernandez
                        </h1>
                        <p className="mt-5 text-base leading-7 text-zinc-600">
                            I&apos;m a BSIT student at National University, currently in my 4th year. I&apos;m
                            passionate about creating clean, functional, and visually appealing web applications.
                            My journey in programming started with curiosity and has grown into a deep interest
                            in frontend development and design systems.
                        </p>
                        <p className="mt-4 text-base leading-7 text-zinc-600">
                            When I&apos;m not coding, I enjoy exploring new technologies, collaborating with
                            classmates on projects, and continuously learning through hands-on lab activities.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles">Read Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Stats */}
            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Profile Overview
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-zinc-900">Quick Summary</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">2nd</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Year Level
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">16+</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Projects Completed
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">09</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Courses Finished
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                            <p className="text-4xl font-extrabold text-zinc-900">03</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                                Focus Areas
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey & Skills */}
            <section className="bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            My Journey
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-zinc-50">Education &amp; Experience</h2>

                        <div className="mt-8 space-y-4">
                            <article className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-lg font-bold text-zinc-50">National University — BSIT</h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">2024 — Present</p>
                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    Currently studying Information Technology with a focus on web programming,
                                    mobile development, and software engineering fundamentals.
                                </p>
                            </article>

                            <article className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-lg font-bold text-zinc-50">Web Programming Course</h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">React, Vite, Tailwind CSS</p>
                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    Hands-on experience building component-based applications, implementing
                                    routing, state management, and responsive design patterns.
                                </p>
                            </article>

                            <article className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-lg font-bold text-zinc-50">Technical Skills</h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">Tools &amp; Technologies</p>
                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    JavaScript, React, HTML/CSS, Tailwind CSS, Git/GitHub, VS Code,
                                    Node.js, Vite, and Flutter for mobile development.
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-zinc-800 p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            Gallery
                        </p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="overflow-hidden rounded-xl">
                                <img src="https://picsum.photos/seed/study-1/300/300" alt="Studying at campus" className="h-full w-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <img src="https://picsum.photos/seed/code-2/300/300" alt="Coding on laptop" className="h-full w-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <img src="https://picsum.photos/seed/team-3/300/300" alt="Team project collaboration" className="h-full w-full object-cover" />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <img src="https://picsum.photos/seed/campus-4/300/300" alt="University campus" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
