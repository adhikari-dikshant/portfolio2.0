import "./projects.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

const ProjectPage = async ({ params }) => {
    const { slug } = await params;
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];

    if (!project) {
        notFound();
    }

    const nextProject = projects[(projectIndex + 1) % projects.length];
    const { hero, metaBar, sections, images = {}, liveUrl } = project;

    return (
        <div className="project-page">
            {/* ── HERO ── */}
            <section className="project-header">
                <Copy delay={0.75}>
                    <>
                        {hero.eyebrow && <p className="lg">{hero.eyebrow}</p>}
                        <div className="project-hero-heading">
                            <h1>{hero.title}</h1>
                            {liveUrl && (
                                <a
                                    href={liveUrl}
                                    className="project-hero-live-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View live site ↗
                                </a>
                            )}
                        </div>
                    </>
                </Copy>
            </section>

            <section className="project-banner-img">
                <div className="project-banner-img-wrapper">
                    <img src={hero.bannerImage} alt={hero.title} />
                </div>
            </section>

            {/* ── META BAR ── */}
            <div className="project-meta-bar">
                {metaBar.map((item) => (
                    <div className="project-meta-bar-item" key={item.label}>
                        <p className="meta-bar-label sm">{item.label}</p>
                        <p className="meta-bar-value">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* ── ABOUT THE PROJECT ── */}
            <section className="project-section">
                <div className="project-section-label">
                    <Copy animateOnScroll={true}>
                        {sections.about.label && <p className="sm">{sections.about.label}</p>}
                    </Copy>
                </div>
                <div className="project-section-content">
                    <Copy animateOnScroll={true}>
                        <h2>{sections.about.heading}</h2>
                        {sections.about.body.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        {sections.about.tagsLine && (
                            <p className="project-tags-line">
                                <span>{sections.about.tagsLine}</span>
                            </p>
                        )}
                    </Copy>
                </div>
            </section>

            <div className="project-section-divider" />

            {/* ── CHALLENGE & SOLUTION ── */}
            <section className="project-section">
                <div className="project-section-label" />
                <div className="project-section-content">
                    <Copy animateOnScroll={true}>
                        <h2>{sections.challenge.heading}</h2>
                        <p>{sections.challenge.body}</p>
                    </Copy>
                </div>
            </section>

            <div className="project-section-divider" />

            {/* ── OUR PROCESS ── */}
            <section className="project-section">
                <div className="project-section-label" />
                <div className="project-section-content">
                    <Copy animateOnScroll={true}>
                        <h2>{sections.process.heading}</h2>
                        <p>{sections.process.body}</p>
                        {sections.process.listItems?.length > 0 && (
                            <ul className="project-list">
                                {sections.process.listItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </Copy>
                </div>
            </section>

            {/* ── FULL-WIDTH IMAGE(S) ── */}
            {images.full?.map((src, index) => (
                <div className="project-full-img" key={`full-${index}`}>
                    <img src={src} alt={`${hero.title} detail ${index + 1}`} />
                </div>
            ))}

            {/* ── RESULT ── */}
            <section className="project-section">
                <div className="project-section-label">
                    <Copy animateOnScroll={true}>
                        {sections.result.label && <p className="sm">{sections.result.label}</p>}
                    </Copy>
                </div>
                <div className="project-section-content">
                    <Copy animateOnScroll={true}>
                        <h2>{sections.result.heading}</h2>
                        <p>{sections.result.body}</p>
                    </Copy>
                </div>
            </section>

            {/* ── TWO-UP IMAGES ── */}
            {images.twoUp?.length === 2 && (
                <div className="project-two-img">
                    {images.twoUp.map((src, index) => (
                        <div className="project-two-img-item" key={`two-${index}`}>
                            <img src={src} alt={`${hero.title} view ${index + 1}`} />
                        </div>
                    ))}
                </div>
            )}

            {/* ── PROJECT NAV ── */}
            <div className="project-nav">
                <a href="/work" className="project-nav-link">
                    ← Back to work
                </a>
                <div className="project-nav-right">
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            className="project-nav-link external"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit live site ↗
                        </a>
                    )}
                    {nextProject && (
                        <a href={`/work/${nextProject.slug}`} className="project-nav-link">
                            Next project → {nextProject.hero.title}
                        </a>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectPage;

