# Finnish Survival Simulator 🇫🇮

Absurd text survival quest in **Alternative Finland**. Balance four stats — **Terveys**, **Raha**, **Mieli**, **Sisu** — and survive as many days as you can.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide Icons**. Installable as a **PWA** on mobile.

## Requirements

- **Node.js** 18+ (20+ recommended)
- **npm** 9+

## Quick start

```bash
# 1. Go to project folder
cd finnish-survival-game

# 2. Install dependencies (first time only)
npm install

# 3. Run dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## npm packages (already in package.json)

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI |
| `vite`, `@vitejs/plugin-react` | Build & dev server |
| `typescript` | Types |
| `tailwindcss`, `@tailwindcss/vite` | Styling |
| `framer-motion` | Card swipe & animations |
| `lucide-react` | Icons |

Install everything with:

```bash
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## Project structure

```
src/
├── components/
│   ├── Header.tsx          # Title, language switch, premium button
│   ├── StatBar.tsx         # 4 stat bars with icons
│   ├── EventCard.tsx       # Daily event + swipe / choices
│   ├── GameOverModal.tsx   # Death screen + share + second life
│   ├── PremiumStore.tsx    # €1.99 demo purchase modal
│   ├── InterstitialAd.tsx  # Full-screen AdMob stub
│   └── RewardedAd.tsx      # Rewarded video stub
├── data/events.ts          # 50+ absurd situations (EN/FI/RU)
├── hooks/useGame.ts        # Game state & logic
├── hooks/usePremium.ts     # Premium flag (localStorage)
├── i18n/ui.ts              # UI strings + death reasons + titles
├── types/game.ts
└── utils/                  # gameLogic, shareCard (canvas image)
```

## Features

- **Gameplay**: Random events, two choices each, stat changes, game over at 0
- **Swipe**: Drag event card left/right (Tinder-style) or tap buttons
- **Viral**: Share text + PNG card via Web Share API or clipboard
- **Ads (demo)**: Interstitial every 5 days & on game over; rewarded ad for second life
- **Premium (demo)**: €1.99 modal — disables ads, unlocks secret events
- **Languages**: English (default), Finnish, Russian

## Deploy PWA

After `npm run build`, host the `dist/` folder on any static host (Vercel, Netlify, GitHub Pages). Ensure `manifest.json` is served from the root.

## Replace demo integrations later

- `InterstitialAd.tsx` / `RewardedAd.tsx` → Google AdMob Web SDK or native wrapper
- `PremiumStore.tsx` → Stripe Checkout or PayPal JS SDK
