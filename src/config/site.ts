import { topics, topicSlug } from "./topics";

export const siteConfig = {
  name: "Chud News",
  tagline: "Gaming news without the corporate leash.",
  title: "Chud News - Unbiased gaming related news",
  description:
    "Unfiltered gaming news, blunt reviews, and strict publisher accountability. No fluff, no PR spin, and zero patience for corporate BS, built by gamers who actually play.",
  /** Set SITE_URL to the production URL in Cloudflare Pages build variables. */
  siteUrl: process.env.SITE_URL || process.env.CF_PAGES_URL || "http://localhost:4321",
  authorName: "Tanis W.",
  email: "hello@example.com",
  language: "en",
  dateLocale: "en-US",
  locale: "en_US",
  socialImage: "/og-image.png",
  publisherLogo: "/og-image.png",
  /** Reading speed behind the "min read" line. Counted from the body at build time. */
  wordsPerMinute: 225,
  /** What a first-time visitor gets. "system" follows the OS; a reader's toggle wins either way. */
  defaultColorMode: "dark",
  /**
   * Lets a `Bookmark` fill itself in from the linked page's Open Graph tags at
   * build time. Every lookup is cached in `.astro`, times out, and falls back
   * to a plain card — but it is still a network call per new link, so set this
   * false for offline or sealed builds and pass `image` to the card by hand.
   */
  fetchBookmarkPreviews: true,
  /** Printed under the masthead and in the footer. Keep it to one sentence. */
  bio: "Bringing the news to you without the corporate filter.",
  /** Shown beside the signup form. Set it to whatever your schedule actually is. */
  cadence: "As Soon As Possible",
  /**
   * The byline that fronts the About page. `name` must match an `author.name`
   * used in issue frontmatter — the block links to that writer's archive.
   */
  editor: {
    name: "Doctor Chud",
    title: "Who writes it",
  },
  /** The one feed, at `/rss.xml`, advertised in the head of every page. */
  rss: {
    /** Puts the whole issue in the feed. Set false to ship summaries only. */
    fullContent: true,
    limit: 20,
  },
  /**
   * The signup form. Point `action` at your provider's form endpoint — Buttondown,
   * Kit, Mailchimp, Listmonk, your own handler — and set `enabled`. Until then the
   * form renders disabled rather than pretending to work.
   */
  newsletter: {
    enabled: true,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "Get the next post",
    description:
      "One email every Thursday. No sequences, no upsells, unsubscribe in a click.",
    terms: "We store your address to send the newsletter, and nothing else.",
    /** Printed under the form as social proof. Leave empty to hide it. */
    proof: "2,400 readers",
  },
  socials: [
    { label: "Bluesky", href: "https://bsky.app" },
    { label: "Mastodon", href: "https://mastodon.social" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export const topicNavigation = topics.map((topic) => ({
  label: topic,
  href: `/topics/${topicSlug(topic)}/`,
}));

/** The bar. Anything longer belongs in the footer. */
export const primaryNavigation = [
  { label: "All Posts", href: "/archive/" },
  { label: "Categories", href: "/topics/" },
  { label: "Developers", href: "/devs/" },
  { label: "About", href: "/about/" },
  { label: "Styleguide", href: "/styleguide/" },
];

export const footerNavigation = [
  {
    title: "Read",
    links: [
      { label: "All posts", href: "/archive/" },
      { label: "Categories", href: "/topics/" },
      { label: "Developers", href: "/devs/" },
      { label: "Search", href: "/search/" },
    ],
  },
  {
    title: "Categories",
    links: topicNavigation,
  },
  {
    title: "Mailer",
    links: [
      { label: "About", href: "/about/" },
      { label: "Subscribe", href: "/#subscribe" },
      { label: "Privacy", href: "/privacy/" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
];
