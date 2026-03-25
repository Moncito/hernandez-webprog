import Button from '../components/Button';

const articles = [
    {
        id: 1,
        tag: 'React',
        title: 'Getting Started with React and Vite',
        description:
            'Learn how to scaffold a modern React project using Vite for lightning-fast HMR, and understand the basics of component-based architecture.',
        image: 'https://picsum.photos/seed/article-react/400/280',
    },
    {
        id: 2,
        tag: 'Tailwind CSS',
        title: 'Utility-First CSS with Tailwind',
        description:
            'Discover why utility-first CSS frameworks like Tailwind are transforming how developers style web applications — faster iteration, consistent design.',
        image: 'https://picsum.photos/seed/article-tailwind/400/280',
    },
    {
        id: 3,
        tag: 'Routing',
        title: 'Client-Side Routing with React Router',
        description:
            'Implement seamless page navigation in your single-page app using React Router DOM, nested routes, layouts, and dynamic paths.',
        image: 'https://picsum.photos/seed/article-router/400/280',
    },
    {
        id: 4,
        tag: 'Git',
        title: 'Version Control Best Practices',
        description:
            'Master branching strategies, meaningful commit messages, and collaboration workflows using Git and GitHub for team projects.',
        image: 'https://picsum.photos/seed/article-git/400/280',
    },
];

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-8">
            {/* Hero */}
            <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <p className="mb-3 inline-block rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-50">
                        Articles
                    </p>
                    <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
                        Insights &amp; Learnings from My Web Dev Journey
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
                        A collection of topic summaries covering the key technologies and concepts I&apos;ve
                        been exploring throughout my web programming course at National University.
                    </p>
                    <div className="mt-8">
                        <Button to="/" variant="primary">Back Home</Button>
                    </div>
                </div>
            </section>

            {/* Featured Article (large) */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="grid lg:grid-cols-2">
                        <div className="overflow-hidden">
                            <img
                                src="https://picsum.photos/seed/featured-article/700/500"
                                alt="Featured article about component-based development"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-8 lg:p-10">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                                Featured
                            </p>
                            <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl">
                                Building Reusable Components in React
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-600">
                                Component reusability is the backbone of scalable React applications. In this
                                write-up, I explore how to design components with props, default values, and
                                variant patterns — the same approach used in this very project&apos;s Button
                                and Layout components.
                            </p>
                            <p className="mt-3 text-sm leading-7 text-zinc-600">
                                By thinking in components early, you can avoid redundancy, keep your codebase
                                DRY (Don&apos;t Repeat Yourself), and make maintenance significantly easier as
                                your project grows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Grid */}
            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Browse Topics
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-zinc-900">All Articles</h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {articles.map((article) => (
                            <article key={article.id} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                                <div className="overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                                        {article.tag}
                                    </p>
                                    <h3 className="mt-2 text-lg font-bold text-zinc-900">{article.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                                        {article.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
