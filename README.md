# BlenderFaceBench

Project website for BlenderFaceBench, an interactive benchmark for fine-grained 3D head reconstruction with multimodal coding agents.

Website: https://blenderfacebench.github.io/

Dataset: https://huggingface.co/datasets/VectorZhao/BlenderFaceBench

This repository contains only the static homepage. No build step is required. GitHub Pages serves `main` from `/ (root)`.

## Local preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The website includes the project overview figure, all 130 sample previews, five original editing-trajectory GIFs, and reported results. Paper and code links are coming soon.

Design inspired by [MMLU-ProX](https://mmluprox.github.io/).
