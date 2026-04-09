import Button from '../components/Button';

function NotFoundPage() {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-4">
            <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Error 404
                </p>
                <h1 className="mt-3 text-5xl font-extrabold text-zinc-900 sm:text-6xl">
                    Page Not Found
                </h1>
                <p className="mt-4 max-w-md text-base leading-7 text-zinc-600">
                    The link you followed to get here must be broken...
                </p>
            </div>

            <div className="flex aspect-video w-full max-w-md items-center justify-center rounded-2xl border-2 border-zinc-300 bg-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button to="/" variant="primary">Back Home</Button>
                <Button to="/articles">View Articles</Button>
            </div>
        </div>
    );
}

export default NotFoundPage;
