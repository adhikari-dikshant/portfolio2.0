export const snippet = {
    name: "snippet",
    title: "Snippet",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Short Description",
            type: "string",
            description: "One-liner shown on the playground grid card.",
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        },
        {
            name: "featured",
            title: "Featured",
            type: "boolean",
            description: "Pin this snippet to the top of the playground grid.",
            initialValue: false,
        },
        // ── Code ─────────────────────────────────────────────────────────────
        {
            name: "html",
            title: "HTML",
            type: "text",
            rows: 10,
        },
        {
            name: "css",
            title: "CSS",
            type: "text",
            rows: 10,
        },
        {
            name: "js",
            title: "JavaScript",
            type: "text",
            rows: 10,
        },
        // ── Blog explanation ─────────────────────────────────────────────────
        {
            name: "body",
            title: "Blog Explanation",
            type: "array",
            description:
                "Walk through how the snippet works — the why and how behind each technique.",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                            { title: "Code", value: "code" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                    },
                                    {
                                        name: "blank",
                                        type: "boolean",
                                        title: "Open in new tab",
                                        initialValue: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                // Inline code block (language-specific)
                {
                    type: "object",
                    name: "codeBlock",
                    title: "Code Block",
                    fields: [
                        {
                            name: "language",
                            title: "Language",
                            type: "string",
                            options: {
                                list: [
                                    { title: "HTML", value: "html" },
                                    { title: "CSS", value: "css" },
                                    { title: "JavaScript", value: "javascript" },
                                    { title: "TypeScript", value: "typescript" },
                                    { title: "Shell", value: "bash" },
                                ],
                            },
                            initialValue: "javascript",
                        },
                        {
                            name: "code",
                            title: "Code",
                            type: "text",
                            rows: 12,
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: { title: "caption", subtitle: "language" },
                        prepare({ title, subtitle }) {
                            return {
                                title: title || "Code Block",
                                subtitle: subtitle,
                            };
                        },
                    },
                },
                // Image within the explanation
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt text",
                        },
                        {
                            name: "caption",
                            type: "string",
                            title: "Caption",
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: { title: "title", subtitle: "description" },
    },
    orderings: [
        {
            title: "Newest first",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
};
