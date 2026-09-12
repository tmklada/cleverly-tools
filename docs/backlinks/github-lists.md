# GitHub list submissions — cleverly.tools

Curated "awesome" lists on GitHub are among the strongest free backlinks available: the repos
themselves have very high authority, and their entries get copied into blog posts and answers.

Everything below is filled in and ready. **Each one needs you to open the PR from your own GitHub
account** — I can prepare the exact change, but submitting is a public action under your name.

---

## 1. public-apis/public-apis  ⭐ highest value, hardest to land

- Repo: https://github.com/public-apis/public-apis
- File to edit: `README.md`
- Suggested category section: **Development** (scan the table of contents and pick the closest;
  if a QR/utility-flavoured section exists, prefer that)

**Rules that matter (from their CONTRIBUTING):**
- One link per pull request
- Description max 100 characters
- The API name must not end with "API" and must not include a domain extension —
  so use `Cleverly Tools`, **not** `cleverly.tools`
- Must be genuinely free with documentation — we qualify: no key, no quota to buy, docs at /api

**Exact table row to add** (keep the single-space padding, insert alphabetically in the section):

```
| [Cleverly Tools](https://cleverly.tools/api) | QR codes, hashing and placeholder text, no key required | No | Yes | Yes | |
```

Column meanings for our entry: Auth `No`, HTTPS `Yes`, CORS `Yes` (we send `Access-Control-Allow-Origin: *`).

**PR title:** `Add Cleverly Tools API`

⚠️ **Honest expectation:** this repo receives a very large volume of PRs and merges slowly; many are
closed without review. It costs 5 minutes to try and the upside is large, but do not count on it.

---

## 2. ripienaar/free-for-dev

- Repo: https://github.com/ripienaar/free-for-dev
- File to edit: `README.md`
- Suggested section: **APIs, Data, and ML**

**Rules that matter:** the service must have a real free tier (not a trial) — we qualify, it is
free with no time limit. The list leans toward infrastructure services, so our entry should lead
with the API rather than the website.

**Exact line to add** (alphabetical within the section):

```
* [Cleverly Tools](https://cleverly.tools/api) — Free API for QR code generation, hashing and placeholder text. No API key, no sign-up, CORS enabled.
```

**PR title:** `Add Cleverly Tools free API`

---

## 3. public-api-lists/public-api-lists

- Repo: https://github.com/public-api-lists/public-api-lists
- Same table format as public-apis, but noticeably more permissive and faster to merge.
- Use the same row as section 1.

**Worth doing first** — a merge here is likelier, and it still produces a real link.

---

## 4. Smaller, easier lists worth trying

These have lower authority but merge quickly, and each one is a genuine link:

- `awesome-web-dev-resources` — add under tools/utilities
- `Awesome-Design-Tools` — our image + colour tools fit
- Any "awesome-productivity" or "awesome-free-tools" list you come across

Use this line for general lists:

```
* [Cleverly Tools](https://cleverly.tools) — 94 free browser-based tools: PDF, image, video, QR, developer and calculator utilities. No sign-up, files never leave your device.
```

---

## How to open the PR (same for every repo)

1. Open the repo and click the pencil icon on `README.md` — GitHub forks it for you automatically
2. Paste the line into the right section, keeping alphabetical order
3. Scroll down, give it the PR title above, and click **Propose changes** → **Create pull request**
4. Leave the body short and factual, for example:

```
Adds Cleverly Tools, a free API for QR code generation, hashing and placeholder text.
No API key or sign-up is required and CORS is enabled. Documentation: https://cleverly.tools/api
```

**Do not** open the same PR in several repos at once with identical wording — maintainers notice, and
it reads as spam. Space them out and adjust the description to each list's style.
