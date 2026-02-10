"use client";
import "./project.css";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef(null);
    const indexRef = useRef(null);
    const imagesContainerRef = useRef(null);
    const imagesRef = useRef([]);
    const namesRef = useRef([]);

    // Using state for index to ensure reactivity, though direct DOM manipulation via GSAP is also fine for performance
    // Keeping it simple with DOM manipulation as per original logic to avoid re-renders during scroll

    // Check if we are in mobile view
    // The original code has some media queries in CSS, but the JS logic seems consistent
    // We will stick to the logic provided

    const projects = [
        { name: "Human Form Study", img: "/spotlight/spotlight-1.jpg" },
        { name: "Interior Light", img: "/spotlight/spotlight-2.jpg" },
        { name: "Project 21", img: "/spotlight/spotlight-3.jpg" },
        { name: "Shadow Portraits", img: "/spotlight/spotlight-4.jpg" },
        { name: "Everyday Objects", img: "/spotlight/spotlight-5.jpg" },
        { name: "Unit 07 Care", img: "/spotlight/spotlight-6.jpg" },
        { name: "Motion Practice", img: "/spotlight/spotlight-7.jpg" },
        { name: "Noonlight Series", img: "/spotlight/spotlight-8.jpg" },
        { name: "Material Stillness", img: "/spotlight/spotlight-9.jpg" },
        { name: "Quiet Walk", img: "/spotlight/spotlight-10.jpg" },
    ];

    useGSAP(
        () => {
            const spotlightSection = containerRef.current;
            const projectIndex = indexRef.current;
            const projectImagesContainer = imagesContainerRef.current;
            const projectImgs = imagesRef.current;
            const projectNames = namesRef.current;

            if (!spotlightSection || !projectIndex || !projectImagesContainer) return;

            const totalProjectCount = projects.length;

            // We need to calculate heights. 
            // In React, this might run before images are fully loaded, so measurements could be off.
            // However, the original code used 'DOMContentLoaded'. 
            // referencing elements directly.

            const measureAndAnimate = () => {
                const spotlightSectionHeight = spotlightSection.offsetHeight;
                const spotlightSectionPadding = parseFloat(
                    window.getComputedStyle(spotlightSection).padding
                );
                const projectIndexHeight = projectIndex.offsetHeight;
                // projectNamesContainer height is roughly total Names height but here we just need the container of names
                // The names are in a container ".project-names". 
                // We'll use a ref for that container too if needed, but original code used:
                // const containerHeight = projectNamesContainer.offsetHeight; -> which refers to the div wrapping p tags

                // Let's get the wrapper of names
                const namesWrapper = projectNames[0]?.parentElement;
                const containerHeight = namesWrapper ? namesWrapper.offsetHeight : 0;

                const imagesHeight = projectImagesContainer.offsetHeight;

                const moveDistanceIndex =
                    spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight;
                const moveDistanceNames =
                    spotlightSectionHeight - spotlightSectionPadding * 2 - containerHeight;
                const moveDistanceImages = window.innerHeight - imagesHeight;

                const imgActivationThreshold = window.innerHeight / 2;

                // Color state for smooth transitions
                const colorState = {
                    active: "#1a1614", // Default on white background
                    inactive: "#4a4a4a",
                };

                const updateProjectStyles = (progress) => {
                    projectIndex.textContent = `${String(
                        Math.min(Math.floor(progress * totalProjectCount) + 1, totalProjectCount)
                    ).padStart(2, "0")}/${String(totalProjectCount).padStart(2, "0")}`;

                    gsap.set(projectIndex, {
                        y: progress * moveDistanceIndex,
                    });

                    gsap.set(projectImagesContainer, {
                        y: progress * moveDistanceImages,
                    });

                    projectImgs.forEach((img) => {
                        if (!img) return;
                        const imgRect = img.getBoundingClientRect();
                        const imgTop = imgRect.top;
                        const imgBottom = imgRect.bottom;

                        if (
                            imgTop <= imgActivationThreshold &&
                            imgBottom >= imgActivationThreshold
                        ) {
                            gsap.set(img, { opacity: 1 });
                        } else {
                            gsap.set(img, { opacity: 0.5 });
                        }
                    });

                    projectNames.forEach((p, index) => {
                        if (!p) return;
                        const startProgress = index / totalProjectCount;
                        const endProgress = (index + 1) / totalProjectCount;
                        const projectProgress = Math.max(
                            0,
                            Math.min(
                                1,
                                (progress - startProgress) / (endProgress - startProgress)
                            )
                        );

                        gsap.set(p, {
                            y: -projectProgress * moveDistanceNames,
                        });

                        if (projectProgress > 0 && projectProgress < 1) {
                            gsap.set(p, { color: colorState.active });
                        } else {
                            gsap.set(p, { color: colorState.inactive });
                        }
                    });
                };

                const mainScrollTrigger = ScrollTrigger.create({
                    trigger: spotlightSection,
                    start: "top top",
                    end: `+=${window.innerHeight * 5}px`, // 500vh scroll distance
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        updateProjectStyles(self.progress);
                    },
                });

                const animateColors = (isDark) => {
                    gsap.to(colorState, {
                        active: isDark ? "#e3e3db" : "#1a1614",
                        inactive: isDark ? "#4a4a4a" : "#4a4a4a",
                        duration: 0.5,
                        onUpdate: () => {
                            if (mainScrollTrigger) {
                                updateProjectStyles(mainScrollTrigger.progress);
                            }
                        },
                    });

                    gsap.to(spotlightSection, {
                        backgroundColor: isDark ? "#141414" : "#e3e3db",
                        color: isDark ? "#e3e3db" : "#1a1614",
                        duration: 0.5,
                    });
                };

                ScrollTrigger.create({
                    trigger: spotlightSection,
                    start: "top center",
                    end: `+=${spotlightSection.offsetHeight + window.innerHeight * 5}`,
                    onEnter: () => animateColors(true),
                    onLeave: () => animateColors(false),
                    onEnterBack: () => animateColors(true),
                    onLeaveBack: () => animateColors(false),
                });
            }

            measureAndAnimate();

            // Refresh scrolltrigger when images load to ensure correct heights
            // Since we don't have a reliable 'all images loaded' event in React without a library,
            // we can just rely on window load or just a small timeout if strictly necessary, 
            // but ScrollTrigger.refresh() usually handles basic layout shifts if they happen before interaction.

        },
        { scope: containerRef }
    );

    // Connect to Lenis for smooth scroll update triggering
    useLenis((lenis) => {
        ScrollTrigger.update();
    });

    return (
        <section className="projects-section" ref={containerRef}>
            <div className="project-index">
                <h1 ref={indexRef}>01/{projects.length}</h1>
            </div>

            <div className="project-images" ref={imagesContainerRef}>
                {projects.map((project, idx) => (
                    <div className="project-img" key={idx} ref={el => imagesRef.current[idx] = el}>
                        <img src={project.img} alt={project.name} />
                    </div>
                ))}
            </div>

            <div className="project-names">
                {projects.map((project, idx) => (
                    <p key={idx} ref={el => namesRef.current[idx] = el}>{project.name}</p>
                ))}
            </div>
        </section>
    );
}