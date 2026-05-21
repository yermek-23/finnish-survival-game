import type { StatKey } from '../types/game'

export const UI = {
  appTitle: 'Finnish Survival',
  appSubtitle: 'Alternative Finland — Fast-Paced Text Survival',
  day: 'Day',
  choose: 'Choose fast — clock is ticking',
  swipeHint: 'Swipe or tap · 5 seconds per decision',
  gameOver: 'Game Over',
  survived: 'You survived',
  days: 'days',
  shareResult: 'Share Result',
  playAgain: 'Play Again',
  startGame: 'Start Survival Run',
  mainMenu: 'Main Menu',
  globalLeaderboard: 'Global Leaderboard',
  yourRank: 'Your Rank',
  outOf: 'out of',
  players: 'players',
  secondLife: 'Second Life',
  watchAd: 'Watch ad to continue',
  premiumPassport: 'Premium Passport',
  buyPremium: 'Buy Premium Passport — €1.99',
  premiumOwned: 'Premium active',
  premiumSuccess: 'Payment successful! Welcome, honorary Finn.',
  premiumDemo: 'Demo mode — no real charge.',
  close: 'Close',
  adLabel: 'Advertisement',
  adSponsored: 'Sponsored',
  adSkip: 'Continue',
  timerLabel: 'Decision timer',
  panicMessage: 'Frozen in fear! Panic increased!',
  howToPlay:
    'Balance Health, Money, Sanity & Sisu. Every choice has 5 seconds — hesitate and you panic!',
  stats: {
    terveys: 'Health',
    raha: 'Money',
    mieli: 'Sanity',
    sisu: 'Sisu',
  } satisfies Record<StatKey, string>,
  shareTemplate:
    'I survived {days} days in Alternative Finland! Status: {title}. Can you beat my record?',
  shareCopied: 'Copied to clipboard — post it everywhere!',
  titles: [
    { min: 0, label: 'Tourist with Wet Socks' },
    { min: 3, label: 'Train Station Bench Expert' },
    { min: 7, label: 'Part-time Moomin' },
    { min: 12, label: 'Honorary Sauna Ghost' },
    { min: 20, label: 'Nordic Legend (unofficial)' },
    { min: 30, label: 'Sisu Demigod' },
  ],
} as const

export const GAME_OVER_BY_STAT: Record<StatKey, { headline: string; body: string }> = {
  terveys: {
    headline: 'Total Physical Collapse',
    body: 'You froze to death in a snowbank outside a K-Market. When was the last time you saw a doctor?!',
  },
  raha: {
    headline: 'Completely Broke',
    body: 'You spent your last Euros on Salmiakki and coffee. Even the local seagulls won\'t look at you. Go find a job.',
  },
  mieli: {
    headline: 'Sanity Has Left the Chat',
    body: 'The endless winter darkness won. You are now talking to a Moomin mug. Go touch some snow.',
  },
  sisu: {
    headline: 'Sisu Depleted',
    body: 'Absolute embarrassment. You complained about the cold and got deported from Finland.',
  },
}

export function getTitle(days: number): string {
  let result: string = UI.titles[0]!.label
  for (const t of UI.titles) {
    if (days >= t.min) result = t.label
  }
  return result
}

export function getStatLabel(key: StatKey): string {
  return UI.stats[key]
}
