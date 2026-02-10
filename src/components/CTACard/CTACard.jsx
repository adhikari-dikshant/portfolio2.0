"use client";
import "./CTACard.css";
import Button from "../Button/Button";
import { MdArticle } from "react-icons/md";
import Copy from "../Copy/Copy";

const CTACard = () => {
    return (
        <section className="cta">
            <div className="container">
                <div className="cta-copy">
                    <div className="cta-col">
                        <Copy animateOnScroll={true}>
                            <p className="sm">Currently Available</p>
                        </Copy>
                    </div>

                    <div className="cta-col">
                        <Copy animateOnScroll={true}>
                            <p className="lg">
                                I collaborate with founders, startups, and teams who
                                care about craft. If you’re building something bold,
                                intentional, and built to scale, we’ll get along.
                            </p>
                        </Copy>

                        <Button
                            animateOnScroll={true}
                            delay={0.25}
                            variant="dark"
                            href="/contact"
                        >
                            Let’s Build Something
                        </Button>
                    </div>
                </div>

                <div className="cta-card">
                    <div className="cta-card-copy">
                        <div className="cta-card-col">
                            <Copy animateOnScroll={true}>
                                <h3>Controlled Chaos</h3>
                            </Copy>
                        </div>

                        <div className="cta-card-col">
                            <Copy animateOnScroll={true}>
                                <p>
                                    Every project starts messy. Ideas everywhere,
                                    half-baked flows, motion experiments at 2AM.
                                    That’s the fun part.
                                </p>

                                <p>
                                    I refine the noise into systems. Clean structure.
                                    Smooth interaction. Performance that holds under pressure.
                                    If it feels effortless, it wasn’t.
                                </p>
                            </Copy>
                            <div className="cta-card-col-buttons">
                                <Button
                                    animateOnScroll={true}
                                    delay={0.25}
                                    variant="light"
                                    icon={MdArticle}
                                    href="/work"
                                >
                                    See How I Work
                                </Button>

                                <Button
                                    animateOnScroll={true}
                                    delay={0.25}
                                    variant="light"
                                    icon={MdArticle}
                                    href="/work"
                                >
                                    Explore Playground
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CTACard;
