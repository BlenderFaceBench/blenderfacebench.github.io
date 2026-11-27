# BlenderFaceBench project website

An English, responsive, buildless static site. Open `index.html` directly, or preview with:

```sh
cd homepage
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8000. No package install, framework, CDN, web font, or build step is required. All site assets use relative paths.

## Publish at BlenderFaceBench.github.io

1. Create the GitHub user/organization repository `BlenderFaceBench/BlenderFaceBench.github.io` under the corresponding account.
2. Copy **the contents of this directory**, including `.nojekyll`, to the repository root. `index.html` must be at the root, not inside `homepage/`.
3. In repository **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site will be available at `https://blenderfacebench.github.io/` after deployment.

Alternatively, if maintaining the website in `homepage/` in a project repository, copy `deployment/github-pages.yml` to that repository's `.github/workflows/pages.yml`, and select **GitHub Actions** in Settings → Pages. That approach serves the project repository's Pages URL, unless deployed in the account's `BlenderFaceBench.github.io` repository.

No deployment or remote repository changes have been made by this local setup.

## Edit the website

- `index.html`: English content, author line, release status, reference methods, and the no-JavaScript Easy table.
- `assets/style.css`: visual design and responsive layouts.
- `assets/main.js`: model records, Easy/Default switch, filtering, numeric sorting, and mobile navigation. Results are embedded so the page also works through `file://`.
- `assets/results.json` / `assets/results.csv`: downloadable data snapshots. Update these together with the records in `main.js` and static rows in `index.html` if results change.
- `assets/images/`: three existing ICT renders from the project figure assets, copied locally for a self-contained site.

### Release updates

The homepage lists all 12 authors in the supplied OpenReview order, as plain names, without profile links or affiliation numbers. The Dataset button links to `https://huggingface.co/datasets/VectorZhao/BlenderFaceBench`. Affiliations, paper URL, code repository URL, and official BibTeX are pending. Replace the pending resource rows with verified links and add the official citation when these become available. No conference acceptance, publication record, or public resource availability is claimed.

Before a public release, follow the source-dataset terms. The repository's `code/README.md` explicitly restricts redistribution of FaceScape-derived assets; the homepage now includes the requested paper Fig. 1 and appendix sample-preview figures, including FaceScape-derived renders. Review their public-release permissions before deploying. No source meshes or full manuscript PDFs are included. Dataset release instructions should describe access under the appropriate source licenses.

## Content provenance

- Project description and headline statistics: `../cvpr/sec/0_abstract.tex` and `../cvpr/sec/1_intro.tex`.
- Protocol, domain sizes, settings, and metric definitions: `../cvpr/sec/3_method.tex`.
- Results and reference methods: `../cvpr/sec/4_experiments.tex`, main results table.
- Failure analysis: `../cvpr/sec/6_failure_analysis.tex`.
- Example renders: `../cvpr/fig/overview_pptx/assets/{target073,preview073-0,replay073}.png`; Qwen3.8 on ICT 073, as identified by the figure caption notes.

Values are transcribed from the local research manuscript, not independently verified model/vendor claims. Easy (ICT100) and Default (ICT20) aggregate results use different sample sets. Gain and Identity are per-target quantities averaged over targets, not values recomputed from aggregate F-scores.

Design reference: [MMLU-ProX](https://mmluprox.github.io/). This site has its own implementation and project-specific content.

## Paper figure and complete sample previews

- `assets/images/fig1-overview.png` and `assets/pdfs/fig1-overview.pdf`: the exact main-paper Fig. 1 referenced by `../cvpr/fig/teaser.tex`.
- `assets/images/ict100-page-{1,2}.png`: all 100 ICT cases, rendered from `../cvpr/fig/supp_protocol/all_ict100_front_side.pdf`.
- `assets/images/crossdomain30.png`: all 30 cross-domain cases, rendered from `../cvpr/fig/supp_protocol/all_crossdomain30_front_side.pdf`.
- Original appendix PDFs are preserved in `assets/pdfs/`. The gallery displays all sample pages as images with full-resolution image links. PDF buttons and links are omitted from the homepage.

The appendix gallery switches between three complete pages. With JavaScript disabled, all three remain visible. Side-view targets are dataset illustrations and are not supplied to agents in benchmark trials.

## Animated editing trajectories

Five original GIFs from the user-provided `~/Downloads/traj_gifs/` directory are copied without modification to `assets/trajectories/`. They appear side by side between the protocol and results sections, with a horizontally scrollable row on mobile. The animations retain their complete original frame sequences, reference insets, step labels, and token counts.
