import React from "react";
import "./playground.css";
import PlaygroundItem from "@/components/PlaygroundItem/PlaygroundItem";
import MagneticButton from "@/components/Sketches/MagneticButton";

const Playground = () => {
    return (
        <div className="playground-page">
            <div className="container">
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
        </div>
    );
};

export default Playground;
