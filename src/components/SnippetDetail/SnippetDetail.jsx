"use client";

import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./SnippetDetail.css";

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

// Portable Text components — maps Sanity blocks to styled HTML
const ptComponents = {
    types: {
        codeBlock: ({ value }) => (
            <div className="sd-code-block">
                {value.caption && (
                    <p className="sd-code-caption">{value.caption}</p>
                )}
                <SyntaxHighlighter
                    language={value.language || "javascript"}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        borderRadius: "0 0 0.5rem 0.5rem",
                        fontSize: "0.82rem",
                        background: "#1a1a1a",
                    }}
                    showLineNumbers
                >
                    {value.code || ""}
                </SyntaxHighlighter>
            </div>
        ),
        image: ({ value }) => (
            <figure className="sd-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={value.asset?.url}
                    alt={value.alt || ""}
                    className="sd-image"
                />
                {value.caption && (
                    <figcaption className="sd-figcaption">{value.caption}</figcaption>
                )}
            </figure>
        ),
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value.href}
                target={value.blank ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="sd-link"
            >
                {children}
            </a>
        ),
        code: ({ children }) => (
            <code className="sd-inline-code">{children}</code>
        ),
    },
    block: {
        h2: ({ children }) => <h2 className="sd-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="sd-h3">{children}</h3>,
        h4: ({ children }) => <h4 className="sd-h4">{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className="sd-blockquote">{children}</blockquote>
        ),
        normal: ({ children }) => <p className="sd-p">{children}</p>,
    },
};

const SnippetDetail = ({ snippet }) => {
    const { html = "", css = "", js = "", body } = snippet;
    const [activeTab, setActiveTab] = useState("html");

    const srcdoc = buildSrcdoc(html, css, js);
    const codeMap = { html, css, js };
    const langMap = { html: "markup", css: "css", js: "javascript" };

    return (
        <div className="sd-wrapper">
            {/* Live Preview */}
            <div className="sd-preview-block">
                <p className="sd-block-label">Live Preview</p>
                <div className="sd-preview">
                    <iframe
                        srcDoc={srcdoc}
                        sandbox="allow-scripts"
                        title="Live preview"
                        className="sd-iframe"
                    />
                </div>
            </div>

            {/* Code Tabs */}
            <div className="sd-code-section">
                <p className="sd-block-label">Source Code</p>
                <div className="sd-tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`sd-tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
                <SyntaxHighlighter
                    language={langMap[activeTab]}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        borderRadius: "0 0 0.5rem 0.5rem",
                        fontSize: "0.82rem",
                        background: "#1a1a1a",
                    }}
                    showLineNumbers
                >
                    {codeMap[activeTab] || `/* No ${activeTab} for this snippet */`}
                </SyntaxHighlighter>
            </div>

            {/* Blog Explanation */}
            {body?.length > 0 && (
                <article className="sd-article">
                    <div className="sd-divider" />
                    <p className="sd-block-label">Breakdown</p>
                    <PortableText value={body} components={ptComponents} />
                </article>
            )}
        </div>
    );
};

export default SnippetDetail;
