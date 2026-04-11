# TypeBridge

TypeBridge is a browser-based keyboard layout trainer for Russian, Ukrainian, and Belarusian layouts.

It helps German QWERTZ users practice Cyrillic keyboard positions, and it can also reverse the drill so Cyrillic learners can practice the matching Latin keys.

## Features

- Russian, Ukrainian, and Belarusian layout practice
- Latin to Cyrillic and Cyrillic to Latin directions
- Freeplay and 60-second timed sessions
- Instant feedback, accuracy, and streak tracking
- Built-in keyboard reference images
- Static HTML, CSS, and JavaScript

## Run Locally

Open `index.html` in a browser.

The checked-in `script.js` is the browser-ready output, so no build step is required for a quick local preview.

## TypeScript Build

The app source lives in `source/app.ts`.

Install dependencies and build:

```sh
npm install
npm run build
```

The build compiles `source/app.ts` to `script.js`, then copies the static site into `dist/`.

Useful scripts:

```sh
npm run typecheck
npm run build
```

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

On pushes to `main`, the workflow:

1. installs Node dependencies,
2. compiles TypeScript,
3. copies the static files to `dist/`,
4. deploys `dist/` to GitHub Pages.

In the repository settings, GitHub Pages should use **GitHub Actions** as the source.

## Project Files

- `index.html`: app markup
- `style.css`: responsive interface styling
- `source/app.ts`: typed trainer source
- `script.js`: compiled browser script
- `tools/copy-static.mjs`: static build output helper
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow
- `src/`: flags and keyboard reference images

## License

Released under the MIT License.
