"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./SnippetCard.css";

const buildSrcdoc = (html, css, js) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e5e5e5; }
  ${css}
</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>
`;

const TABS = ["html", "css", "js"];

const SnippetCard = ({ snippet }) => {
    const { title, description, tags = [], html = "", css = "", js = "", slug, body } = snippet;
    const [showCode, setShowCode] = useState(false);
    const [activeTab, setActiveTab] = useState("html");

    const srcdoc = buildSrcdoc(html, css, js);
    const codeMap = { html, css, js };
    const langMap = { html: "markup", css: "css", js: "javascript" };
    const slugStr = slug?.current ?? slug;
    const hasArticle = !!body?.length || !!slugStr;

    return (
        <div className="snippet-card">
            <div className="snippet-card-preview">
                <iframe
                    srcDoc={srcdoc}
                    sandbox="allow-scripts"
                    title={title}
                    className="snippet-iframe"
                />
            </div>

            <div className="snippet-card-info">
                <div className="snippet-card-meta">
                    <div>
                        <h3 className="snippet-card-title">{title}</h3>
                        {description && (
                            <p className="snippet-card-desc">{description}</p>
                        )}
                    </div>
                    <button
                        className={`snippet-code-toggle ${showCode ? "active" : ""}`}
                        onClick={() => setShowCode((v) => !v)}
                        aria-label="Toggle code"
                    >
                        {showCode ? "Hide" : "Code"}
                    </button>
                </div>

                <div className="snippet-card-footer">
                    {tags.length > 0 && (
                        <div className="snippet-tags">
                            {tags.map((tag) => (
                                <span key={tag} className="snippet-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {hasArticle && slugStr && (
                        <Link
                            href={`/playground/${slugStr}`}
                            className="snippet-read-link"
                        >
                            Read article →
                        </Link>
                    )}
                </div>
            </div>

            {showCode && (
                <div className="snippet-code-panel">
                    <div className="snippet-code-tabs">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                className={`snippet-tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="snippet-code-body">
                        <SyntaxHighlighter
                            language={langMap[activeTab]}
                            style={oneDark}
                            customStyle={{
                                margin: 0,
                                borderRadius: 0,
                                fontSize: "0.8rem",
                                maxHeight: "260px",
                                background: "#1a1a1a",
                            }}
                            showLineNumbers
                        >
                            {codeMap[activeTab] || `/* No ${activeTab} for this snippet */`}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnippetCard;
