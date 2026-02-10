"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import TeamCards from "@/components/TeamCards/TeamCards";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import HeroTrail from "@/components/HeroTrail/HeroTrail";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
        });

        const onLoad = () => ScrollTrigger.refresh(true);
        window.addEventListener("load", onLoad, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("load", onLoad);
        };
    }, []);

    return (
        <>
            <section className="hero">
                <HeroTrail />
                <div className="container">
                    <div className="hero-content-main">
                        <Copy animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                            <h1>UI/UX <span>designer</span></h1>
                        </Copy>
                        <Copy animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                            <h1><span>frontend</span> developer</h1>
                        </Copy>
                    </div>
                </div>
            </section >

            <Preloader />

            <Showreel />

            <About />

            <TeamCards />

            <Projects />

            <Spotlight />

            <CTACard />

            <Footer />
        </>
    );
};

export default Page;
