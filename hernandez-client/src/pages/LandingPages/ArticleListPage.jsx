import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const { data } = await fetchArticles();
                // Map database fields to what the ArticleList component expects
                const mappedArticles = data.articles.map(a => ({
                    name: a.slug,
                    title: a.title,
                    content: [a.preview] // Wrap preview in array to match component's expectations
                }));
                setArticles(mappedArticles);
            } catch (err) {
                console.error("Failed to fetch articles:", err);
            } finally {
                setLoading(false);
            }
        };
        getArticles();
    }, []);

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Articles
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Real-time articles from MongoDB
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                    This page now dynamically fetches articles managed through your dashboard. 
                    Any changes you make in the database will appear here instantly.
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
                </div>

                {loading ? (
                    <p>Loading articles...</p>
                ) : articles.length > 0 ? (
                    <ArticleList articles={articles} />
                ) : (
                    <p className="text-zinc-500">No articles found in the database.</p>
                )}
            </section>
        </div>
    );
}

export default ArticleListPage;
