"use client";
import "./about.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
    const containerRef = useRef(null);
    const marqueeTrackRef = useRef(null);
    const indicatorRef = useRef(null);
    const copyBlocksRef = useRef([]);

    // We can use the velocity from lenis hook
    const lenis = useLenis();
    const targetVelocityRef = useRef(0);

    useGSAP(
        () => {
            // --- Marquee Animation ---
            const marqueeTrack = marqueeTrackRef.current;
            const items = gsap.utils.toArray(".marquee-item", marqueeTrack);

            // Clone items for infinite loop
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                marqueeTrack.appendChild(clone);
            });

            let marqueePosition = 0;
            let smoothVelocity = 0;

            gsap.ticker.add((time, deltaTime, frame) => {
                // Approximate smooth damping: targetVelocity comes from scroll
                // If lenis is active, we can get velocity.
                // However, useLenis hook gives us an instance, but we might want to listen to its scroll event or just read velocity if available.
                // The original code used lenis.on('scroll') to update targetVelocity.
                // We'll update targetVelocityRef in the lenis callback below.

                smoothVelocity += (targetVelocityRef.current - smoothVelocity) * 0.5;

                const baseSpeed = 0.45;
                const speed = baseSpeed + smoothVelocity * 9;

                marqueePosition -= speed;

                // Reset position for loop
                // We need the width of the original set of items (half the total width after cloning)
                const trackWidth = marqueeTrack.scrollWidth / 2;

                if (marqueePosition <= -trackWidth) {
                    marqueePosition = 0;
                }

                gsap.set(marqueeTrack, { x: marqueePosition });

                // Decay target velocity
                targetVelocityRef.current *= 0.9;
            });

            // --- Text Reveal Animation ---
            const textBlocks = copyBlocksRef.current;
            const splitInstances = textBlocks.map((block) =>
                new SplitText(block, { type: "words", mask: "words" })
            );

            // Hide the words of the 2nd and 3rd blocks initially
            if (splitInstances.length >= 3) {
                gsap.set(splitInstances[1].words, { yPercent: 100 });
                gsap.set(splitInstances[2].words, { yPercent: 100 });
            }

            const overlapCount = 3;

            const getWordProgress = (phaseProgress, wordIndex, totalWords) => {
                const totalLength = 1 + overlapCount / totalWords;
                // Avoid division by zero if totalWords is 0 (though unlikely here)
                if (totalWords === 0) return 0;

                const scale =
                    1 /
                    Math.min(
                        totalLength,
                        1 + (totalWords - 1) / totalWords + overlapCount / totalWords
                    );

                const startTime = (wordIndex / totalWords) * scale;
                const endTime = startTime + (overlapCount / totalWords) * scale;
                const duration = endTime - startTime;

                if (phaseProgress <= startTime) return 0;
                if (phaseProgress >= endTime) return 1;
                return (phaseProgress - startTime) / duration;
            };

            const animateBlock = (outBlock, inBlock, phaseProgress) => {
                if (!outBlock || !inBlock) return;

                outBlock.words.forEach((word, i) => {
                    const progress = getWordProgress(phaseProgress, i, outBlock.words.length);
                    gsap.set(word, { yPercent: progress * 100 });
                });

                inBlock.words.forEach((word, i) => {
                    const progress = getWordProgress(phaseProgress, i, inBlock.words.length);
                    gsap.set(word, { yPercent: 100 - progress * 100 });
                });
            };

            const indicator = indicatorRef.current;

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true, // using scrub might be smoother than onUpdate for simple progress if lenis is handling scroll
                // sticking to onUpdate to match original logic exactly
                onUpdate: (self) => {
                    const scrollProgress = self.progress;

                    if (indicator) {
                        gsap.set(indicator, { "--progress": scrollProgress });
                    }

                    if (splitInstances.length < 3) return;

                    if (scrollProgress <= 0.5) {
                        const phase1 = scrollProgress / 0.5;
                        animateBlock(splitInstances[0], splitInstances[1], phase1);
                        // Ensure block 3 is hidden
                        gsap.set(splitInstances[2].words, { yPercent: 100 });
                    } else {
                        const phase2 = (scrollProgress - 0.5) / 0.5;
                        // Ensure block 1 is fully out
                        gsap.set(splitInstances[0].words, { yPercent: 100 });
                        animateBlock(splitInstances[1], splitInstances[2], phase2);
                    }
                },
            });
        },
        { scope: containerRef }
    );

    // Update velocity from Lenis
    // useLenis hook returns the lenis instance, but also accepts a callback
    useLenis((e) => {
        targetVelocityRef.current = Math.abs(e.velocity) * 0.02;
        ScrollTrigger.update();
    });

    const images = [
        "/spotlight/spotlight-1.webp",
        "/spotlight/spotlight-3.webp",
        "/spotlight/spotlight-5.webp",
        "/spotlight/spotlight-7.webp",
        "/spotlight/spotlight-9.webp",
        "/spotlight/spotlight-11.webp",
        "/spotlight/spotlight-13.webp",
        "/spotlight/spotlight-15.webp",
        "/spotlight/spotlight-14.webp",
        "/spotlight/spotlight-4.webp",
    ];

    return (
        <div className="about-container" ref={containerRef}>
            <section className="about">
                <div className="about-copy">
                    <div className="copy-block">
                        <p ref={(el) => (copyBlocksRef.current[0] = el)}>
                            I craft digital experiences with a focus on design, functionality,
                            and user-centered thinking. My approach is thoughtful and
                            iterative.
                        </p>
                    </div>
                    <div className="copy-block">
                        <p ref={(el) => (copyBlocksRef.current[1] = el)}>
                            I build interfaces that feel intuitive, with clean code and
                            attention to detail across every interaction.
                        </p>
                    </div>
                    <div className="copy-block">
                        <p ref={(el) => (copyBlocksRef.current[2] = el)}>
                            The final products aim to bridge design intent and technical
                            precision, creating seamless experiences that resonate with users.
                        </p>
                    </div>
                </div>

                <div className="marquee">
                    <div className="marquee-track" ref={marqueeTrackRef}>
                        {images.map((src, index) => (
                            <div className="marquee-item" key={index}>
                                <img src={src} alt={`Marquee item ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="scroll-indicator" ref={indicatorRef}></div>
            </section>
        </div>
    );
}
