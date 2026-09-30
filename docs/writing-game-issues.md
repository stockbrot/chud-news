# One game, one issue

Start from `src/content/issues/cyberpunk-2077/index.mdx` or
`src/content/issues/baldurs-gate-3/index.mdx`. These are published starter examples
covering selected historical events, with placeholder gradient covers. Expand
the research before treating either as a complete assessment of the game.

## Create a game record

1. Create `src/content/issues/your-game/index.mdx` and a local cover image.
2. Use an unused issue number (the examples use 14 and 15).
3. Set `author.name` to the exact developer/company name in `src/config/writers.ts`.
4. Set `date` to the issue's publication date, not the game's release date.
5. Set `score` to the sum of the score changes in your table, not the developer's
   total. The site adds 1,000 and the scores from that developer's published issues.
6. Set `draft: true` while writing if you want the issue excluded from public
   pages, feeds, search, and developer scores. Drafts currently have no preview route.
7. Replace the cover and its alt text and credits together.

## Update it

Keep the same folder, issue number, `date`, and developer. Add `updatedDate` with
the date you actually revised the article. Add a dated history entry with a source,
the affected platforms/version, your reason for the points, and the new running
issue total. Update the verdict, excerpt if needed, and frontmatter `score` to match.

For example, a -50 launch penalty and a +25 verified fix produce:

```yaml
score: -25
updatedDate: 2026-10-02
```

That date is illustrative; use the actual edit date. Event dates belong in the
history. Don't backdate the publication or imply you tested a fix when you only
read patch notes. A 48-hour or 30-day recovery award needs evidence covering that
period. An unassessed event gets no points yet; that doesn't prove it never happened.

Use one penalty per problem and one content award per update. A worse version of
the same problem replaces its original penalty: explain the revision and adjust
the table, rather than counting both. Label factual corrections separately from
earned recovery. Don't create another issue for the same game's next patch.

Developer totals can include other games. A new game's table starts at zero,
not 1,000, and never repeats points already awarded in another issue.

Run `npm run check` and `npm run build` after editing. The score table is ordinary
Markdown: its maths and the frontmatter total must be kept in sync manually.
