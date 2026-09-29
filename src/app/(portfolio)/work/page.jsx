"use client";
import "./work.css";
import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "@/components/Copy/Copy";
import { isInitialLoad } from "@/components/Preloader/Preloader";
import { projects } from "@/data/projects";

gsap.registerPlugin(useGSAP);

const WORK_START_YEAR = 2024;

const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://www.instagram.com/ikshwaku_/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dikshant-singh-adhikari/" },
    { label: "GitHub", href: "https://github.com/adhikari-dikshant" },
];

const workPreviews = (key) => [1, 2, 3].map((n) => `/work/work_${key}_${n}.webp`);

const workList = [
    {
        name: "Daily Workspace",
        href: "/newtab-extension",
        images: workPreviews("daily_workspace"),
    },
    { slug: "open-blood", images: workPreviews(6) },
    { slug: "nebbula-coworking", images: workPreviews(5) },
    { slug: "primark-india", images: workPreviews(7) },
    { slug: "am-circle-pvt-ltd", images: workPreviews(1) },
    { slug: "asquarefx-studios", images: workPreviews(2) },
    { slug: "danish-powers", images: workPreviews(3) },
    { slug: "my-dear-tiger", images: workPreviews(4) },
];

const Page = () => {
    const { navigateWithTransition } = useViewTransition();

    const workPageContainer = useRef(null);
    const heroDelay = isInitialLoad ? 1.75 : 0.75;

    const workItems = useMemo(
        () => {
            const variants = ["variant-1", "variant-2", "variant-3", "variant-4"];

            return workList.map((item, index) => {
                const project = projects.find((p) => p.slug === item.slug);

                return {
                    index: (index + 1).toString().padStart(2, "0"),
                    name: item.name ?? project?.name,
                    href: item.href ?? `/work/${item.slug}`,
                    variant: variants[index % variants.length],
                    images: item.images,
                };
            });
        },
        []
    );

    useGSAP(
        () => {
            const q = gsap.utils.selector(workPageContainer);
            const folders = q(".folder");
            const folderWrappers = q(".folder-wrapper");

            let isMobile = window.innerWidth < 1000;

            const setInitialPositions = () => {
                gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
            };

            const mouseEnterHandlers = new Map();
            const mouseLeaveHandlers = new Map();

            folders.forEach((folder, index) => {
                const previewImages = folder.querySelectorAll(".folder-preview-img");

                const onEnter = () => {
                    if (isMobile) return;

                    folders.forEach((siblingFolder) => {
                        if (siblingFolder !== folder) {
                            siblingFolder.classList.add("disabled");
                        }
                    });

                    gsap.to(folderWrappers[index], {
                        y: 0,
                        duration: 0.25,
                        ease: "back.out(1.7)",
                    });

                    previewImages.forEach((img, imgIndex) => {
                        let rotation;
                        if (imgIndex === 0) {
                            rotation = gsap.utils.random(-20, -10);
                        } else if (imgIndex === 1) {
                            rotation = gsap.utils.random(-10, 10);
                        } else {
                            rotation = gsap.utils.random(10, 20);
                        }

                        gsap.to(img, {
                            y: "-100%",
                            rotation,
                            duration: 0.25,
                            ease: "back.out(1.7)",
                            delay: imgIndex * 0.025,
                        });
                    });
                };

                const onLeave = () => {
                    if (isMobile) return;

                    folders.forEach((siblingFolder) => {
                        siblingFolder.classList.remove("disabled");
                    });

                    gsap.to(folderWrappers[index], {
                        y: 25,
                        duration: 0.25,
                        ease: "back.out(1.7)",
                    });

                    previewImages.forEach((img, imgIndex) => {
                        gsap.to(img, {
                            y: "0%",
                            rotation: 0,
                            duration: 0.25,
                            ease: "back.out(1.7)",
                            delay: imgIndex * 0.05,
                        });
                    });
                };

                mouseEnterHandlers.set(folder, onEnter);
                mouseLeaveHandlers.set(folder, onLeave);
                folder.addEventListener("mouseenter", onEnter);
                folder.addEventListener("mouseleave", onLeave);
            });

            const handleResize = () => {
                const currentBreakpoint = window.innerWidth < 1000;
                if (currentBreakpoint !== isMobile) {
                    isMobile = currentBreakpoint;
                    setInitialPositions();

                    folders.forEach((folder) => {
                        folder.classList.remove("disabled");
                    });
                    const allPreviewImages = q(".folder-preview-img");
                    gsap.set(allPreviewImages, { y: "0%", rotation: 0 });
                }
            };

            window.addEventListener("resize", handleResize);
            setInitialPositions();

            return () => {
                window.removeEventListener("resize", handleResize);
                folders.forEach((folder) => {
                    const onEnter = mouseEnterHandlers.get(folder);
                    const onLeave = mouseLeaveHandlers.get(folder);
                    if (onEnter) folder.removeEventListener("mouseenter", onEnter);
                    if (onLeave) folder.removeEventListener("mouseleave", onLeave);
                });
            };
        },
        { scope: workPageContainer }
    );

    return (
        <>
            <section className="work-hero">
                <h1>
                    <Copy animateOnScroll={false} delay={heroDelay}>
                        <span className="work-hero-line">Recent —</span>
                    </Copy>
                    <Copy animateOnScroll={false} delay={heroDelay + 0.08}>
                        <span className="work-hero-line">Works from</span>
                    </Copy>
                    <Copy animateOnScroll={false} delay={heroDelay + 0.16}>
                        <span className="work-hero-line">
                            ©{WORK_START_YEAR}-{new Date().getFullYear()}
                        </span>
                    </Copy>
                </h1>

                <div className="work-hero-links">
                    <Copy animateOnScroll={false} delay={heroDelay + 0.3}>
                        {SOCIAL_LINKS.map(({ label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                                {label}
                            </a>
                        ))}
                    </Copy>
                </div>
            </section>

            <section className="folders" ref={workPageContainer}>
                {Array.from({ length: Math.ceil(workItems.length / 2) }).map((_, rowIndex) => (
                    <div className="row" key={`row-${rowIndex}`}>
                        {workItems.slice(rowIndex * 2, rowIndex * 2 + 2).map((item) => (
                            <a
                                key={item.index}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigateWithTransition(item.href);
                                }}
                            >
                                <div className={`folder ${item.variant}`}>
                                    <div className="folder-preview">
                                        {item.images.map((src, i) => (
                                            <div
                                                className="folder-preview-img"
                                                key={`${item.index}-img-${i}`}
                                            >
                                                <img src={src} alt={`Preview ${i + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="folder-wrapper">
                                        <div className="folder-index">
                                            <p>{item.index}</p>
                                        </div>
                                        <div className="folder-name">
                                            <h1>{item.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </section>
        </>
    );
};

export default Page;
