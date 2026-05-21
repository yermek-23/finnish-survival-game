import type { Locale, StatKey } from '../types/game'

export interface GameOverCopy {
  headline: string
  body: string
}

export interface UiBundle {
  appTitle: string
  appSubtitle: string
  day: string
  days: string
  choose: string
  swipeHint: string
  gameOver: string
  survived: string
  finalStatus: string
  shareResult: string
  shareCopied: string
  playAgain: string
  startGame: string
  mainMenu: string
  globalLeaderboard: string
  yourRank: string
  outOf: string
  players: string
  howToPlay: string
  timerLabel: string
  panicMessage: string
  welcomeTitle: string
  welcomeSubtitle: string
  nicknameLabel: string
  nicknamePlaceholder: string
  nicknameError: string
  continueBtn: string
  demoBadge: string
  paywallTitle: string
  paywallSubtitle: string
  paywallFeatures: string[]
  unlockFullGame: string
  restorePurchase: string
  demoFinished: string
  premiumActive: string
  secondLife: string
  watchAd: string
  close: string
  adSponsored: string
  adSkip: string
  loadingNext: string
  stats: Record<StatKey, string>
  titles: { min: number; label: string }[]
  shareTemplate: string
  gameOverByStat: Record<StatKey, GameOverCopy>
}

const en: UiBundle = {
  appTitle: 'Finnish Survival',
  appSubtitle: 'Alternative Finland — Fast-Paced Survival',
  day: 'Day',
  days: 'days',
  choose: 'Choose fast — 10 seconds per decision',
  swipeHint: 'Swipe or tap · decide before time runs out',
  gameOver: 'Game Over',
  survived: 'You survived',
  finalStatus: 'Final status',
  shareResult: 'Share Result',
  shareCopied: 'Copied to clipboard!',
  playAgain: 'Play Again',
  startGame: 'Start Survival Run',
  mainMenu: 'Main Menu',
  globalLeaderboard: 'Global Leaderboard',
  yourRank: 'Your Rank',
  outOf: 'out of',
  players: 'players',
  howToPlay:
    'Balance Health, Money, Sanity & Sisu. You have 10 seconds per choice — freeze and you panic!',
  timerLabel: 'Decision timer',
  panicMessage: 'Frozen in fear! Panic increased!',
  welcomeTitle: 'Welcome to Finland',
  welcomeSubtitle: 'Enter your nickname to join the global leaderboard',
  nicknameLabel: 'Your nickname',
  nicknamePlaceholder: 'e.g. SisuWarrior_42',
  nicknameError: 'Please enter a nickname to continue',
  continueBtn: 'Enter the North',
  demoBadge: 'Free demo: 5 days',
  paywallTitle: 'Demo Finished!',
  paywallSubtitle:
    'Unlock 45+ ultimate cultural events, real-time leaderboards, and infinite survival for only $1.99',
  paywallFeatures: [
    '45+ fully translated cultural events',
    'Unlimited days — true survival mode',
    'Global leaderboard sync (coming soon)',
    'No ads · Premium Sisu events',
  ],
  unlockFullGame: 'Unlock Full Game — $1.99',
  restorePurchase: 'Restore Purchase',
  demoFinished: 'You survived the free demo. The moose demands more.',
  premiumActive: 'Premium unlocked — infinite survival!',
  secondLife: 'Second Life',
  watchAd: 'Watch ad to continue',
  close: 'Close',
  adSponsored: 'Sponsored',
  adSkip: 'Continue',
  loadingNext: 'Next Finnish chaos loading...',
  stats: { terveys: 'Health', raha: 'Money', mieli: 'Sanity', sisu: 'Sisu' },
  titles: [
    { min: 0, label: 'Tourist with Wet Socks' },
    { min: 3, label: 'Train Station Bench Expert' },
    { min: 7, label: 'Part-time Moomin' },
    { min: 12, label: 'Honorary Sauna Ghost' },
    { min: 20, label: 'Nordic Legend' },
    { min: 30, label: 'Sisu Demigod' },
  ],
  shareTemplate:
    'I survived {days} days in Alternative Finland! Status: {title}. Can you beat my record?',
  gameOverByStat: {
    terveys: {
      headline: 'Total Physical Collapse',
      body: 'You froze to death in a snowbank outside a K-Market. When was the last time you saw a doctor?!',
    },
    raha: {
      headline: 'Completely Broke',
      body: 'You spent your last Euros on Salmiakki and coffee. Even the seagulls avoid you. Go find a job.',
    },
    mieli: {
      headline: 'Sanity Has Left the Chat',
      body: 'The endless winter darkness won. You are now talking to a Moomin mug. Go touch some snow.',
    },
    sisu: {
      headline: 'Sisu Depleted',
      body: 'You complained about the cold and got deported from Finland. Absolute embarrassment.',
    },
  },
}

const fi: UiBundle = {
  appTitle: 'Suomen Selviytyjä',
  appSubtitle: 'Vaihtoehtoinen Suomi — Nopea selviytymispeli',
  day: 'Päivä',
  days: 'päivää',
  choose: 'Valitse nopeasti — 10 sekuntia',
  swipeHint: 'Pyyhkäise tai napauta · päätä ennen kuin aika loppuu',
  gameOver: 'Peli ohi',
  survived: 'Selvisit',
  finalStatus: 'Lopputilanne',
  shareResult: 'Jaa tulos',
  shareCopied: 'Kopioitu leikepöydälle!',
  playAgain: 'Pelaa uudelleen',
  startGame: 'Aloita selviytyminen',
  mainMenu: 'Päävalikko',
  globalLeaderboard: 'Maailmanlaajuinen tulostaulu',
  yourRank: 'Sijoituksesi',
  outOf: '/',
  players: 'pelaajaa',
  howToPlay:
    'Tasapainota Terveys, Raha, Mieli ja Sisu. 10 sekuntia per valinta — jäädy ja paniikki iskee!',
  timerLabel: 'Päätösaika',
  panicMessage: 'Jähmettyit pelosta! Paniikki kasvoi!',
  welcomeTitle: 'Tervetuloa Suomeen',
  welcomeSubtitle: 'Syötä nimimerkkisi liittyäksesi tulostauluun',
  nicknameLabel: 'Nimimerkkisi',
  nicknamePlaceholder: 'esim. SisuSoturi_42',
  nicknameError: 'Syötä nimimerkki jatkaaksesi',
  continueBtn: 'Astu pohjoiseen',
  demoBadge: 'Ilmainen demo: 5 päivää',
  paywallTitle: 'Demo päättyi!',
  paywallSubtitle:
    'Avaa 45+ kulttuuritapahtumaa, tulostaulut ja loputon selviytyminen vain 1,99 $',
  paywallFeatures: [
    '45+ käännettyä kulttuuritapahtumaa',
    'Rajattomat päivät — oikea selviytyminen',
    'Tulostaulun synkronointi (tulossa)',
    'Ei mainoksia · Premium-tapahtumat',
  ],
  unlockFullGame: 'Avaa koko peli — 1,99 $',
  restorePurchase: 'Palauta osto',
  demoFinished: 'Selvisit ilmaisesta demosta. Hirvi vaatii lisää.',
  premiumActive: 'Premium avattu — loputon selviytyminen!',
  secondLife: 'Toinen elämä',
  watchAd: 'Katso mainos jatkaaksesi',
  close: 'Sulje',
  adSponsored: 'Sponsoroitu',
  adSkip: 'Jatka',
  loadingNext: 'Seuraava suomalainen kaaos latautuu...',
  stats: { terveys: 'Terveys', raha: 'Raha', mieli: 'Mieli', sisu: 'Sisu' },
  titles: [
    { min: 0, label: 'Turisti märin sukin' },
    { min: 3, label: 'Aseman penkkiguru' },
    { min: 7, label: 'Osapäivä-Muumi' },
    { min: 12, label: 'Kunnia Sauna-aave' },
    { min: 20, label: 'Pohjoismainen legenda' },
    { min: 30, label: 'Sisu-puolijumala' },
  ],
  shareTemplate:
    'Selvisin {days} päivää Vaihtoehtoisessa Suomessa! Status: {title}. Voitko lyödä ennätykseni?',
  gameOverByStat: {
    terveys: {
      headline: 'Täydellinen romahdus',
      body: 'Jäädyit kuoliaaksi K-Marketin edessä. Milloin kävit viimeksi lääkärissä?!',
    },
    raha: {
      headline: 'Täysin köyhä',
      body: 'Viimeiset eurot menivät salmiakkiin ja kahviin. Lokitkin välttelevät sinua.',
    },
    mieli: {
      headline: 'Mieli lähti chatista',
      body: 'Loputon talvipimeys voitti. Puhut nyt Muumi-mukille. Mene koskemaan lunta.',
    },
    sisu: {
      headline: 'Sisu loppui',
      body: 'Valitit kylmää ja sinut karkotettiin Suomesta. Absoluuttinen nolo.',
    },
  },
}

const sv: UiBundle = {
  appTitle: 'Finsk Överlevnad',
  appSubtitle: 'Alternativ Finland — Snabb överlevnad',
  day: 'Dag',
  days: 'dagar',
  choose: 'Välj snabbt — 10 sekunder',
  swipeHint: 'Svep eller tryck · bestäm innan tiden tar slut',
  gameOver: 'Spelet är över',
  survived: 'Du överlevde',
  finalStatus: 'Slutstatus',
  shareResult: 'Dela resultat',
  shareCopied: 'Kopierat till urklipp!',
  playAgain: 'Spela igen',
  startGame: 'Starta överlevnad',
  mainMenu: 'Huvudmeny',
  globalLeaderboard: 'Global topplista',
  yourRank: 'Din placering',
  outOf: 'av',
  players: 'spelare',
  howToPlay:
    'Balansera Hälsa, Pengar, Sinne & Sisu. 10 sekunder per val — tveka och panik slår till!',
  timerLabel: 'Beslutstimer',
  panicMessage: 'Frusen av rädsla! Paniken ökade!',
  welcomeTitle: 'Välkommen till Finland',
  welcomeSubtitle: 'Ange ditt smeknamn för att gå med i topplistan',
  nicknameLabel: 'Ditt smeknamn',
  nicknamePlaceholder: 't.ex. SisuKrigare_42',
  nicknameError: 'Ange ett smeknamn för att fortsätta',
  continueBtn: 'Gå in i norr',
  demoBadge: 'Gratis demo: 5 dagar',
  paywallTitle: 'Demo avslutad!',
  paywallSubtitle:
    'Lås upp 45+ kulturella händelser, topplistor och oändlig överlevnad för endast $1.99',
  paywallFeatures: [
    '45+ översatta kulturella händelser',
    'Oändliga dagar — äkta överlevnad',
    'Topplistasynk (kommer snart)',
    'Inga annonser · Premium-händelser',
  ],
  unlockFullGame: 'Lås upp fullt spel — $1.99',
  restorePurchase: 'Återställ köp',
  demoFinished: 'Du överlevde demon. Älgen kräver mer.',
  premiumActive: 'Premium upplåst — oändlig överlevnad!',
  secondLife: 'Andra livet',
  watchAd: 'Se annons för att fortsätta',
  close: 'Stäng',
  adSponsored: 'Sponsrad',
  adSkip: 'Fortsätt',
  loadingNext: 'Nästa finska kaos laddas...',
  stats: { terveys: 'Hälsa', raha: 'Pengar', mieli: 'Sinne', sisu: 'Sisu' },
  titles: [
    { min: 0, label: 'Turist med våta strumpor' },
    { min: 3, label: 'Bänkexpert på stationen' },
    { min: 7, label: 'Deltids-Mumin' },
    { min: 12, label: 'Heders-Bastu-spöke' },
    { min: 20, label: 'Nordisk legend' },
    { min: 30, label: 'Sisu-halvgud' },
  ],
  shareTemplate:
    'Jag överlevde {days} dagar i Alternativa Finland! Status: {title}. Kan du slå mitt rekord?',
  gameOverByStat: {
    terveys: {
      headline: 'Total kollaps',
      body: 'Du frös ihjäl i en snöbank utanför K-Market. När var du senast hos läkaren?!',
    },
    raha: {
      headline: 'Helt pank',
      body: 'Sista euro gick till salmiak och kaffe. Måsarna undviker dig. Skaffa ett jobb.',
    },
    mieli: {
      headline: 'Sinnet har lämnat chatten',
      body: 'Den oändliga vintermörkret vann. Du pratar med en Mumin-mugg. Rör snö.',
    },
    sisu: {
      headline: 'Sisu slut',
      body: 'Du klagade på kylan och deporterades från Finland. Total skam.',
    },
  },
}

const ru: UiBundle = {
  appTitle: 'Финское Выживание',
  appSubtitle: 'Альтернативная Финляндия — Быстрая стратегия',
  day: 'День',
  days: 'дней',
  choose: 'Выбирай быстро — 10 секунд',
  swipeHint: 'Свайп или нажми · решай до конца таймера',
  gameOver: 'Конец игры',
  survived: 'Ты продержался',
  finalStatus: 'Итоговый статус',
  shareResult: 'Поделиться',
  shareCopied: 'Скопировано в буфер!',
  playAgain: 'Ещё раз',
  startGame: 'Начать выживание',
  mainMenu: 'Главное меню',
  globalLeaderboard: 'Мировой рейтинг',
  yourRank: 'Твоё место',
  outOf: 'из',
  players: 'игроков',
  howToPlay:
    'Балансируй Здоровье, Деньги, Рассудок и Sisu. 10 секунд на выбор — замрёшь и паника!',
  timerLabel: 'Таймер решения',
  panicMessage: 'Замёрз от страха! Паника выросла!',
  welcomeTitle: 'Добро пожаловать в Финляндию',
  welcomeSubtitle: 'Введи ник для входа в мировой рейтинг',
  nicknameLabel: 'Твой никнейм',
  nicknamePlaceholder: 'напр. SisuWarrior_42',
  nicknameError: 'Введи никнейм, чтобы продолжить',
  continueBtn: 'Войти на Север',
  demoBadge: 'Бесплатное демо: 5 дней',
  paywallTitle: 'Демо завершено!',
  paywallSubtitle:
    'Открой 45+ культурных событий, рейтинги и бесконечное выживание всего за $1.99',
  paywallFeatures: [
    '45+ переведённых культурных событий',
    'Безлимитные дни — настоящее выживание',
    'Синхронизация рейтинга (скоро)',
    'Без рекламы · Premium-события',
  ],
  unlockFullGame: 'Разблокировать игру — $1.99',
  restorePurchase: 'Восстановить покупку',
  demoFinished: 'Ты прошёл демо. Лось требует продолжения.',
  premiumActive: 'Premium активен — бесконечное выживание!',
  secondLife: 'Вторая жизнь',
  watchAd: 'Смотреть рекламу',
  close: 'Закрыть',
  adSponsored: 'Реклама',
  adSkip: 'Продолжить',
  loadingNext: 'Загрузка следующего финского хаоса...',
  stats: {
    terveys: 'Здоровье',
    raha: 'Деньги',
    mieli: 'Рассудок',
    sisu: 'Sisu',
  },
  titles: [
    { min: 0, label: 'Турист с мокрыми носками' },
    { min: 3, label: 'Эксперт скамьи' },
    { min: 7, label: 'Муми-тролль на полставки' },
    { min: 12, label: 'Призрак сауны' },
    { min: 20, label: 'Нордическая легенда' },
    { min: 30, label: 'Полубог Sisu' },
  ],
  shareTemplate:
    'Я продержался {days} дней в Альтернативной Финляндии! Статус: {title}. Побьёшь рекорд?',
  gameOverByStat: {
    terveys: {
      headline: 'Полный физический крах',
      body: 'Ты замёрз в сугробе у K-Market. Когда ты последний раз был у врача?!',
    },
    raha: {
      headline: 'Полный крах',
      body: 'Последние евро ушли на salmiakki и кофе. Чайки сторонятся. Иди работай.',
    },
    mieli: {
      headline: 'Рассудок покинул чат',
      body: 'Бесконечная зимняя тьма победила. Ты говоришь с кружкой Moomin. Потрогай снег.',
    },
    sisu: {
      headline: 'Sisu исчерпан',
      body: 'Ты пожаловался на холод — тебя депортировали. Абсолютный позор.',
    },
  },
}

export const UI: Record<Locale, UiBundle> = { en, fi, sv, ru }

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fi', label: 'FI' },
  { code: 'sv', label: 'SV' },
  { code: 'ru', label: 'RU' },
]

export function getUi(locale: Locale): UiBundle {
  return UI[locale]
}

export function getTitle(locale: Locale, days: number): string {
  let result = UI[locale].titles[0]!.label
  for (const row of UI[locale].titles) {
    if (days >= row.min) result = row.label
  }
  return result
}
