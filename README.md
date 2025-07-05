# Website Portfolio

Link:
<https://basemshaker.com/>

Includes:
* About Me
* Eduction Experience / Portfolio
* Work Experience / Portfolio
* Extracurricular

## Development

Create the Conda environment and set up git hooks:

```bash
conda env create -f environment.yaml
conda activate website-dev
pre-commit install
```

Run hooks against all files with:

```bash
pre-commit run --all-files
```
