"use client";
import React, { useEffect, useRef } from "react";

const HeroTrail = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Configuration
        const config = {
            imageCount: 10,
            imageLifepan: 750,
            removeDelay: 50,
            mouseTreshold: 100,
            scrollTreshold: 50,
            idleCursorInterval: 300,
            inDuration: 750,
            outDuration: 1000,
            inEasing: "cubic-bezier(0.7, 0.5, 0.5, 1)", // easeOutBack-ish
            outEasing: "cubic-bezier(0.87, 0, 0.13, 1)",
        };

        // Images
        const imgs = Array.from(
            { length: config.imageCount },
            (_, i) => `/spotlight/spotlight-${i + 1}.webp`
        );

        const trail = [];

        let mouseX = 0,
            mouseY = 0,
            lastMouseX = 0,
            lastMouseY = 0;

        let isMoving = false,
            isCursorInContainer = false;

        let lastRemovalTime = 0,
            lastSteadyImageTime = 0,
            lastScrollTime = 0;

        let isScrolling = false,
            scrollTicking = false;

        let moveTimeout;
        let scrollTimeout;
        let animationFrameId;

        const isInContainer = (x, y) => {
            if (!container) return false;
            const rect = container.getBoundingClientRect();
            return (
                x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
            );
        };

        // Initial mouse position setup
        const setInitialMousePosition = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            isCursorInContainer = isInContainer(mouseX, mouseY);
            document.removeEventListener("mouseover", setInitialMousePosition);
        };
        document.addEventListener("mouseover", setInitialMousePosition);


        const createImage = () => {
            const img = document.createElement("img");
            img.classList.add("trail-img");

            const randomIndex = Math.floor(Math.random() * imgs.length);
            const rotation = (Math.random() - 0.5) * 50;
            img.src = imgs[randomIndex];

            const rect = container.getBoundingClientRect();
            const relativeX = mouseX - rect.left;
            const relativeY = mouseY - rect.top;

            img.style.left = `${relativeX}px`;
            img.style.top = `${relativeY}px`;
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
            img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

            container.appendChild(img);

            // Force reflow/next tick for transition
            setTimeout(() => {
                img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
            }, 10);

            trail.push({
                element: img,
                rotation: rotation,
                removalTime: Date.now() + config.imageLifepan,
            });
        };

        const hasMovedEnough = () => {
            const distance = Math.sqrt(
                Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
            );
            return distance > config.mouseTreshold;
        }

        const createTrailImg = () => {
            // Only create if cursor is inside
            if (!isCursorInContainer) return;

            const now = Date.now();

            if (isMoving && hasMovedEnough()) {
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                createImage();
                return;
            }

            if (isMoving && now - lastSteadyImageTime > config.idleCursorInterval) {
                lastSteadyImageTime = now;
                createImage();
            }
        };

        const createScrollTrailImg = () => {
            if (!isCursorInContainer) return;

            // Jiggle slightly for effect
            lastMouseX +=
                (config.mouseTreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
            lastMouseY +=
                (config.mouseTreshold + 10) * (Math.random() > 0.5 ? 1 : -1);

            createImage();

            lastMouseX = mouseX;
            lastMouseY = mouseY;
        };


        const removeOldImages = () => {
            const now = Date.now();
            // Remove check
            if (now - lastRemovalTime < config.removeDelay || trail.length === 0) {
                return;
            }

            const oldestImg = trail[0];
            if (oldestImg.removalTime <= now) {
                const imgToRemove = trail.shift();

                // Out animation
                imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
                imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;

                lastRemovalTime = now;

                setTimeout(() => {
                    if (imgToRemove.element && imgToRemove.element.parentNode) {
                        imgToRemove.element.parentNode.removeChild(imgToRemove.element);
                    }
                }, config.outDuration);
            }
        };


        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isCursorInContainer = isInContainer(mouseX, mouseY);

            if (isCursorInContainer) {
                isMoving = true;
                clearTimeout(moveTimeout);
                moveTimeout = setTimeout(() => {
                    isMoving = false;
                }, 100);
            }
        };

        const handleScroll = () => {
            isCursorInContainer = isInContainer(mouseX, mouseY);
            const now = Date.now();

            if (isCursorInContainer) {
                isMoving = true;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isMoving = false;
                }, 100);
            }

            isScrolling = true;
            if (now - lastScrollTime < config.scrollTreshold) return;
            lastScrollTime = now;

            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (isScrolling) {
                        createScrollTrailImg();
                        isScrolling = false;
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        };


        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        const animate = () => {
            createTrailImg();
            removeOldImages();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", setInitialMousePosition);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(moveTimeout);
            clearTimeout(scrollTimeout);

            // Clear container
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return <div ref={containerRef} className="hero-trail-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1 // Behind text which is z-index 2+
    }}>

    </div>;
};

export default HeroTrail;
