import React from "react";
import "./playground.css";
import PlaygroundItem from "@/components/PlaygroundItem/PlaygroundItem";
import MagneticButton from "@/components/Sketches/MagneticButton";

const Playground = () => {
    return (
        <div className="playground-page">
            <div className="container playground-content">
                <div className="playground-header">
                    <h1>Constructed Chaos</h1>
                    <p>A collection of interactive experiments, motion studies, and UI components.</p>
                </div>

                <div className="playground-grid">
                    <PlaygroundItem
                        title="Magnetic Button"
                        tag="Interaction / GSAP"
                    >
                        <MagneticButton />
                    </PlaygroundItem>
                </div>
            </div>

            <div className="playground-overlay">
                <div className="playground-overlay-inner">
                    <p className="sm">Playground</p>
                    <h2>Coming Soon</h2>
                    <p>
                        A space for live prototypes, design explorations, and small experiments.
                        Stay tuned while we assemble the first batch.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Playground;
