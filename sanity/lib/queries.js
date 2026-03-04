import { groq } from "next-sanity";

// All snippets for the playground grid
export const allSnippetsQuery = groq`
  *[_type == "snippet"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    tags,
    featured,
    publishedAt,
    html,
    css,
    js
  }
`;

// Single snippet by slug (includes body for the detail/blog page)
export const snippetBySlugQuery = groq`
  *[_type == "snippet" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    tags,
    featured,
    publishedAt,
    html,
    css,
    js,
    body
  }
`;

// Adjacent snippets for prev/next navigation
export const adjacentSnippetsQuery = groq`
  {
    "prev": *[_type == "snippet" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
      title, slug
    },
    "next": *[_type == "snippet" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
      title, slug
    }
  }
`;

// All slugs for static generation
export const allSnippetSlugsQuery = groq`
  *[_type == "snippet"] { "slug": slug.current }
`;
