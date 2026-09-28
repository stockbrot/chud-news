# Issue comments

Every issue includes a minimal discussion section below the article and before the
newsletter signup. Its theme follows the site's light/dark toggle.

To activate comments:

1. Enable Discussions on the public repository `stockbrot/chud-news` and install
   the [Giscus GitHub app](https://github.com/apps/giscus) for that repository.
2. Open [giscus.app](https://giscus.app), select the repository and an Announcements
   category, and copy the generated repository ID and category ID.
3. Fill in `repoId` and `categoryId` in `src/config/comments.ts`. Match `category`
   to the chosen category name (and change `repo` if using another repository).
4. Rebuild and deploy the site.

The IDs are public configuration, not secrets. Until all values are present, the
section shows a quiet “Comments are coming soon” message without loading Giscus.
Set `enabled: false` to hide the section entirely.

Discussions use strict pathname matching, so each issue has its own thread,
independent of the site domain. Keep issue paths stable to retain those threads.
The comment editor appears above replies; main-post reactions are hidden.
Readers sign in with GitHub to comment, and moderation happens in GitHub Discussions.
