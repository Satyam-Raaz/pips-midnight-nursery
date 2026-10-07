# React + Vite

# Pip’s First Website

A one-night portfolio for **Pip, the Junior Dream Engineer**, built for the haX.baby *Baby’s First Website* hackathon (Track 1). Scroll and the night passes from 7 PM to sunrise.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy

- **Vercel:** import the GitHub repo, framework preset *Vite*, deploy.
- **GitHub Pages:** `npm run build`, then publish the `dist/` folder.

## What’s inside

- Scroll-driven night clock and sky (7 PM → 6 AM), status bar, loading screen
- Pip’s eyes follow the cursor; Pip falls asleep when idle and wakes on movement
- Lullaby Lab: 8 Web Audio keys, terminal readout, Brahms / Twinkle / generative Raag Bhoopali, Dream Echo slider
- Nightlight Collection, Rattle & Block Toys, Dream Delivery route (SVG, scroll-synced)
- Story scenes, flip-page Storybook, Growth Chart
- Sparkle cursor trail, click sounds with mute, day/night toggle, visitor odometer, welcome-back memory
- Hidden surprises for curious visitors (no spoilers)

## Structure

```
src/
  audio.js  sky.js  utils.js  hooks/useVisits.js
  components/  Pip, Win, Odometer, Lullaby, Lamps, Blocks, Route, Scene, Book, Growth
  App.jsx  main.jsx  styles.css
```

## Credits

Pip drawn in SVG, sounds synthesised live with the Web Audio API, fonts Fraunces and Fredoka (Google Fonts), built with React 18 and Vite.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
