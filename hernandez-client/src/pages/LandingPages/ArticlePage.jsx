import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchArticleBySlug } from '../../services/ArticleService';

function ArticlePage() {
    const { name } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const { data } = await fetchArticleBySlug(name);
                setArticle(data);
            } catch (err) {
                console.error("Article fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        getArticle();
    }, [name]);

    if (loading) {
        return (
            <div className="flex w-full flex-col gap-6 p-8">
                <p>Loading article content...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex w-full flex-col gap-6">
                <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
                        <Button to="/articles" className="mt-6">Back to Articles</Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-4">
                        <Button to="/articles">&larr; Back to Articles</Button>
                    </div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Article
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                        {article.title}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        {article.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200 mb-8">
                        <div className="h-24 w-24 border-2 border-zinc-300 bg-zinc-100" />
                    </div>

                    <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
                        <p className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                            {article.preview}
                        </p>
                        {/* If you add a full 'content' field to your Article model later, you can map it here */}
                    </div>

                    <div className="mt-8 border-t-2 border-zinc-900 pt-6">
                        <Button to="/articles">Back to Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;
