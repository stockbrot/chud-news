# One game, one issue

Use an existing `src/content/issues/<game>/index.mdx` for the article format.
Research the new game separately and apply the current scoring guide; existing
articles may contain scores written under an earlier version of the rules.

## Create a game record

1. Create `src/content/issues/your-game/index.mdx` and a local cover image.
2. Use an unused issue number.
3. Set `author.name` to the exact developer/company name in `src/config/writers.ts`.
4. Set `date` to the game's release date.
4.5 Set `updatedDate` to time of posting.
5. Set `score` to the game's **current contribution**: its original launch verdict
   plus any eligible one-time repair credit. This is not the developer's total.
   The site adds 1,000 and the contributions from that developer's published issues.
6. Set `draft: true` while writing if you want the issue excluded from public
   pages, feeds, search, and developer scores. Drafts currently have no preview route.
7. Replace the cover and its alt text and credits together.

## Choose a launch score

Use the [scoring guide](/scoring/) (version 2.5). The usual original launch verdict is
−150 to +50; an exception needs an explicit label and explanation. These are
editorial judgments, not a bug-count formula or a percentage rating.

Write the review **for the reader**: explain what they paid for, what actually
shipped, and what the score says about that experience. Keep author instructions
in this document, not on the public scoring page.

1. Assess release day and the first **14 days**, then settle the original launch
   verdict. Verified minor fixes within the window remove the corresponding
   minor adjustment. Serious failures at release still determine a negative
   verdict, even if repaired by day 14. An eligible substantial free repair
   within the window gets separate, one-time credit; it doesn't soften the
   original verdict as well. Describe both release day and the state at day 14.
2. Decide whether delivery succeeded. +20 to +25 means a well-delivered,
   enjoyable game meeting expectations; +26 to +50 means it meaningfully exceeds
   them; +1 to +19 means successful delivery with weaker strengths or minor
   reservations. Use 0 for an assessed mixed verdict, not an unassessed draft.
3. If delivery failed, choose **one overall penalty based on the biggest
   problem**. Don't award +25 for the vision or enjoyable pieces and then subtract
   a long list of failures. Serious bugs, poor core gameplay, or writing that
   undermines the experience disqualify the positive delivery award.

For a successful or mixed delivery, apply at most one **minor adjustment** of
−1 to −10 for the biggest remaining annoyance: awkward UI tabs, extra clicks,
visual glitches, or non-game-breaking bugs. Use −1 to −3 for rare friction,
−4 to −6 for recurring annoyances, and −7 to −10 for regular interruptions.
This is an adjustment, not a final verdict. A +25 assessment with −5 for UI
finishes at +20; an otherwise mixed 0 assessment with −5 finishes at −5.
Serious delivery failures use the negative verdict ranges below instead.

| Original launch verdict for the biggest failure | What belongs here |
| --- | --- |
| −11 to −24: a failed launch | A broadly buggy but playable mess, repeated crashes with limited lost progress, poor performance, or seriously disappointing writing or gameplay. Around −20 fits a game whose intended vision is there but whose delivery fails. |
| −25 to −50: game-breaking failures | Deleted or corrupted saves, blocked main-story progress, or instability that makes normal play unreliable. Near −25 for a limited failure with an effective workaround; toward −50 for repeated save loss or widespread inability to play. |
| Below −50: an exceptional failure | An unusually severe combination of core failures or major, documented misrepresentation. Explain why −25 to −50 is insufficient. The usual lower limit remains −150. |

Judge **impact first, frequency second**. Use the smaller deduction in a range
for limited effects or easy workarounds, and the larger deduction for frequent,
widespread, or costly problems. One corrupted save can outweigh many visual
glitches. A UI problem that prevents play is more severe than an awkward tab.

**The biggest issue takes priority.** Confusing UI and save deletion produce a
save-deletion verdict, not two deductions. Mention secondary complaints in the
review without charging extra points. Other major failures can explain a harsher
overall verdict, but don't stack penalties. Serious bugs or failures in core
writing or gameplay rule out the positive delivery award altogether.

For the overall verdict, describe the specific mechanic, scene, bug, missing option,
or content, its frequency and impact, and the affected platform/version. Link
evidence for factual claims and label your opinions. Gameplay, writing,
accessibility, and value can affect the score without technical bugs. Consider
price and meaningful content rather than hours alone. Disliking a genre or
difficulty isn't automatically a fault; explain the execution that failed for you.
Unverified claims get no deductions. Keep an unassessed game in draft rather
than publishing 0 as a placeholder; the site defaults an omitted score to 0.

### Worked launch examples

Use one launch verdict row in the score history. Explain any minor adjustment in
that row rather than listing penalties for every complaint:

| Launch assessment | Original launch verdict | Reason |
| --- | ---: | --- |
| Successful delivery, awkward UI | +20 | +25 quality assessment with one −5 UI adjustment. |
| Appealing vision, broadly buggy but playable | −20 | Failed delivery; no positive award for potential. |
| Save-deleting glitches and awkward UI | −40 | Save deletion determines the penalty; no extra UI deduction. |

These are three separate illustrative games. The **original launch verdict**
records the release assessment. The **current contribution** is that verdict
plus any eligible one-time repair credit, and is what frontmatter `score` stores.
Keep both figures clearly labelled in the article. A −20 original verdict with
+5 repair credit has a −15 current contribution; a developer with no other games
then has 985 points. Repair credit never changes the original verdict.
The roughly −20 buggy-launch example reflects the proposed Cyberpunk-style
assessment, not a researched score for every version of Cyberpunk 2077.

Use existing emotes sparingly when they suit the sentence, for example `:Clap:`
for good delivery or `:PepeHands:` for lost saves. MDX also supports
`<Emote name="Clap" />`. Add aliases in `src/config/emotes.ts` only when needed.

## Update it

Set genres with `topic`, and platform families separately with `platforms`:

```yaml
topic: ["Horror", "Survival"]
platforms: ["Xbox", "PlayStation", "PC", "Nintendo"]
```

Only include supported platforms. Nintendo covers Nintendo consoles such as
Switch 2; PlayStation and Xbox likewise cover their console families. The Genres
browser combines one platform and one genre, and a game can match multiple genres.

Keep the same folder, issue number, `date`, and developer. Add `updatedDate` with
the date you actually revised the article. Add a dated history entry with a source,
the affected platforms/version, your reason for the points, and the new running
current contribution. Update the current-state summary, excerpt if needed, and
frontmatter `score` to match; keep the original launch verdict visible.

For example, an original launch verdict of −20 and +5 eligible repair credit
produce a current contribution of −15:

```yaml
score: -15
updatedDate: 2026-10-02
```

That date is illustrative; use the actual edit date. Event dates belong in the
history. Don't backdate the publication or imply you tested a fix when you only
read patch notes. State the release date, grace-window end, and the date a
substantial repair was verified. An unassessed event gets no points yet; that
doesn't prove it never happened.

Keep one overall launch verdict, not one penalty per problem. Correct factual
errors with a labelled explanation rather than silently rewriting the launch.
Label earned recovery separately. Don't create another issue for the same
game's next patch, and don't penalise new problems years later as launch failures.

**Routine patches earn no points.** There is one exception: one substantial,
free repair restoring the playable, reasonably stable standard expected at
release can recover at most **half the negative launch verdict**, rounded down
to a whole point. A −25 launch allows at most +12. Positive and zero launch
verdicts have no recovery allowance. Repairs within the 14-day window use this
same one-time allowance. Do not reduce the original serious-failure verdict for
an early repair and then award credit for that repair too. Minor fixes within
the grace window earn no repair credit. Later patches accumulate no more credit.

For example, save deletion judged at −40 and substantially repaired for free on
day 10 can justify up to +20 credit. At day 14, record an original launch verdict
of −40, repair credit of +20, and a current contribution of −20. The early fix
uses the game's entire repair allowance in this example.

Award less the longer the repair took, measured from release. A convincing
repair within the grace window or shortly afterward can justify up to half; months later warrants
less; after a year or more, little or nothing. Explain the delay and chosen
amount, rather than claiming an automatic entitlement. For a −20 launch, a
prompt substantial repair might recover +10 (current contribution −10), while a
slower repair might recover +5 (current contribution −15). The original launch
verdict remains −20 in both cases.

Verify the restored experience on the affected platforms; patch notes alone
aren't proof. Buying DLC or newer hardware is not a free repair for the original
affected players. Apologies, roadmaps, and unverified claims earn nothing.
Keep the original launch verdict visible and add at most one repair-credit entry.

Free additions, expansions, and paid DLC earn **no content bonuses** in this
launch-focused system. Cover them in the dated history if useful to readers.

Developer totals can include other games. A new game's table starts at zero,
not 1,000, and never repeats points already awarded in another issue.

Run `npm run check` and `npm run build` after editing. The score table is ordinary
Markdown: its maths and the frontmatter total must be kept in sync manually.
