export const topics = ["Game Announcement", "Game Launch", "Updates", "Controversy", "Drama", "Censorship", "Community", "Redemption", "Industry"] as const;

export type Topic = (typeof topics)[number];

export const topicSlug = (topic: Topic) => topic.toLowerCase().replace(/\s+/g, "-");

export const topicMeta: Record<Topic, { summary: string }> = {
  "Game Announcement": {
    summary: "Writing the thing: openings, endings, voice, and what to cut before you send.",
  },
  "Game Launch": {
    summary: "How an issue looks in an inbox and on the web, and why the two rarely match.",
  },
  Updates: {
    summary: "Finding readers and keeping them, without buying a list or begging for shares.",
  },
  Controversy: {
    summary: "Paid tiers, sponsorship, and what the whole thing costs to keep running.",
  },
  Drama: {
    summary: "Sending software, deliverability, analytics, and what is worth paying for.",
  },
  Censorship: {
    summary: "Conversations with people who have been publishing long enough to have opinions.",
  },
  Community: {
    summary: "Conversations with people who have been publishing long enough to have opinions.",
  },
  Redemption: {
    summary: "Conversations with people who have been publishing long enough to have opinions.",
  },
  Industry: {
    summary: "Conversations with people who have been publishing long enough to have opinions.",
  },
};
