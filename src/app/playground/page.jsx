export const revalidate = 60; // re-fetch from Sanity every 60 seconds

import React from "react";
import "./playground.css";
import PlaygroundItem from "@/components/PlaygroundItem/PlaygroundItem";
import MagneticButton from "@/components/Sketches/MagneticButton";
import SnippetCard from "@/components/SnippetCard/SnippetCard";
import { client } from "../../../sanity/lib/client";
import { allSnippetsQuery } from "../../../sanity/lib/queries";

async function getSnippets() {
    try {
        return await client.fetch(allSnippetsQuery);
    } catch (err) {
        console.error("Failed to fetch snippets from Sanity:", err.message);
        return [];
    }
}

const Playground = async () => {
    const snippets = await getSnippets();

    return (
        <div className="playground-page">
            <div className="container playground-content">
                <div className="playground-header">
                    <h1>Constructed Chaos</h1>
                    <p>A collection of interactive experiments, motion studies, and UI components — each with a written breakdown of how it works.</p>
                </div>

                <div className="playground-grid">
                    {/* Static pre-built experiments */}
                    <PlaygroundItem
                        title="Magnetic Button"
                        tag="Interaction / GSAP"
                    >
                        <MagneticButton />
                    </PlaygroundItem>

                    {/* Dynamic snippets from Sanity */}
                    {snippets.map((snippet) => (
                        <SnippetCard key={snippet._id} snippet={snippet} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playground;
