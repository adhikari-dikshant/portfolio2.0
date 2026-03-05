export const revalidate = 60; // re-fetch from Sanity every 60 seconds
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "../../../../../sanity/lib/client";
import {
    snippetBySlugQuery,
    adjacentSnippetsQuery,
    allSnippetSlugsQuery,
} from "../../../../../sanity/lib/queries";
import SnippetDetail from "@/components/SnippetDetail/SnippetDetail";

export async function generateStaticParams() {
    const slugs = await client.fetch(allSnippetSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const snippet = await client.fetch(snippetBySlugQuery, { slug });
    if (!snippet) return {};
    return {
        title: `${snippet.title} — Constructed Chaos`,
        description: snippet.description || "",
    };
}

export default async function SnippetPage({ params }) {
    const { slug } = await params;
    const [snippet, adjacent] = await Promise.all([
        client.fetch(snippetBySlugQuery, { slug }),
        client
            .fetch(snippetBySlugQuery, { slug })
            .then((s) =>
                s
                    ? client.fetch(adjacentSnippetsQuery, {
                        publishedAt: s.publishedAt,
                    })
                    : null
            ),
    ]);

    if (!snippet) notFound();

    return (
        <div className="snippet-detail-page">
            <div className="container snippet-detail-container">
                {/* Back nav */}
                <Link href="/playground" className="snippet-back">
                    ← Back to Playground
                </Link>

                {/* Header */}
                <header className="snippet-detail-header">
                    {snippet.tags?.length > 0 && (
                        <div className="snippet-detail-tags">
                            {snippet.tags.map((tag) => (
                                <span key={tag} className="snippet-detail-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h1 className="snippet-detail-title">{snippet.title}</h1>
                    {snippet.description && (
                        <p className="snippet-detail-desc">{snippet.description}</p>
                    )}
                    {snippet.publishedAt && (
                        <time className="snippet-detail-date">
                            {new Date(snippet.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    )}
                </header>

                {/* Interactive client component: preview + code tabs + body */}
                <SnippetDetail snippet={snippet} />

                {/* Prev / Next */}
                {adjacent && (adjacent.prev || adjacent.next) && (
                    <nav className="snippet-nav">
                        <div className="snippet-nav-item">
                            {adjacent.prev && (
                                <Link
                                    href={`/playground/${adjacent.prev.slug.current}`}
                                    className="snippet-nav-link"
                                >
                                    <span className="snippet-nav-label">← Previous</span>
                                    <span className="snippet-nav-title">
                                        {adjacent.prev.title}
                                    </span>
                                </Link>
                            )}
                        </div>
                        <div className="snippet-nav-item snippet-nav-item--right">
                            {adjacent.next && (
                                <Link
                                    href={`/playground/${adjacent.next.slug.current}`}
                                    className="snippet-nav-link"
                                >
                                    <span className="snippet-nav-label">Next →</span>
                                    <span className="snippet-nav-title">
                                        {adjacent.next.title}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
}
