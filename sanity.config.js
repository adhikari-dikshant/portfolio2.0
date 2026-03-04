import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
    name: "polite-chaos",
    title: "Polite Chaos CMS",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    basePath: "/studio",
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title("Content")
                    .items([
                        S.listItem()
                            .title("Snippets")
                            .id("snippets")
                            .child(
                                S.documentList()
                                    .title("Snippets")
                                    .filter('_type == "snippet"')
                                    .defaultOrdering([
                                        { field: "publishedAt", direction: "desc" },
                                    ])
                            ),
                    ]),
        }),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
    },
});
