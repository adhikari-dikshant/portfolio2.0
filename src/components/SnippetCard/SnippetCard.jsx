"use client";

import React from "react";
import Link from "next/link";
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
  ${css || ""}
</style>
</head>
<body>
${html || ""}
<script>${js || ""}<\/script>
</body>
</html>
`;

const SnippetCard = ({ snippet, span = 1 }) => {
    const { title, tags = [], html = "", css = "", js = "", slug } = snippet;
    const slugStr = slug?.current ?? slug;
    const srcdoc = buildSrcdoc(html, css, js);
    const tagList = tags.length > 0 ? tags : ["Snippet"];

    const card = (
        <div className={`playground-item span-${span}`}>
            <div className="playground-item-preview">
                <iframe
                    srcDoc={srcdoc}
                    sandbox="allow-scripts"
                    title={title}
                    className="playground-item-iframe"
                />
            </div>
            <div className="playground-item-info">
                <h3>{title}</h3>
                <div className="playground-item-tags">
                    {tagList.map((tag) => (
                        <span key={tag} className="playground-item-tag pill">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    if (slugStr) {
        return (
            <Link href={`/playground/${slugStr}`} className="playground-item-link">
                {card}
            </Link>
        );
    }

    return card;
};

export default SnippetCard;
