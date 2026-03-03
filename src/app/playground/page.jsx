import React from "react";
import "./playground.css";
import PlaygroundItem from "@/components/PlaygroundItem/PlaygroundItem";
import MagneticButton from "@/components/Sketches/MagneticButton";
import SnippetCard from "@/components/SnippetCard/SnippetCard";
import { supabase } from "@/lib/supabase";

async function getSnippets() {
    const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch snippets:", error.message);
        return [];
    }
    return data || [];
}

const Playground = async () => {
    const snippets = await getSnippets();

    return (
        <div className="playground-page">
            <div className="container playground-content">
                <div className="playground-header">
                    <h1>Constructed Chaos</h1>
                    <p>A collection of interactive experiments, motion studies, and UI components.</p>
                </div>

                <div className="playground-grid">
                    {/* Static pre-built experiments */}
                    <PlaygroundItem
                        title="Magnetic Button"
                        tag="Interaction / GSAP"
                    >
                        <MagneticButton />
                    </PlaygroundItem>

                    {/* Dynamic snippets from Supabase */}
                    {snippets.map((snippet) => (
                        <SnippetCard key={snippet.id} snippet={snippet} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playground;
