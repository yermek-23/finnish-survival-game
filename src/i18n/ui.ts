import type { Locale, StatKey } from '../types/game'

type UiStrings = {
  appTitle: string
  appSubtitle: string
  day: string
  choose: string
  swipeHint: string
  gameOver: string
  survived: string
  shareResult: string
  playAgain: string
  secondLife: string
  watchAd: string
  premiumPassport: string
  buyPremium: string
  premiumOwned: string
  premiumSuccess: string
  premiumDemo: string
  close: string
  adLabel: string
  adSponsored: string
  adSkip: string
  stats: Record<StatKey, string>
  deathBy: Record<StatKey, string[]>
  titles: { min: number; label: string }[]
  shareTemplate: string
  shareCopied: string
  language: string
}

const en: UiStrings = {
  appTitle: 'Finnish Survival',
  appSubtitle: 'Alternative Finland Simulator',
  day: 'Day',
  choose: 'Choose your fate',
  swipeHint: 'Swipe or tap a choice',
  gameOver: 'Game Over',
  survived: 'You survived',
  shareResult: 'Share result (Jaa tulos)',
  playAgain: 'Try again',
  secondLife: 'Second life?',
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
  stats: {
    terveys: 'Terveys',
    raha: 'Raha',
    mieli: 'Mieli',
    sisu: 'Sisu',
  },
  deathBy: {
    terveys: [
      'you ate too much mämmi and your body filed for independence',
      'the -35°C wind won an arm-wrestling match with your immune system',
      'you slipped on black ice while carrying 4 bags of Fazer chocolate',
    ],
    raha: [
      'your bank account died of loneliness after one too many Alko runs',
      'HSL fines compound interest reached cosmic levels',
      'you tried to pay rent in salmiakki coins',
    ],
    mieli: [
      'you accidentally said "hei" to a stranger on the tram',
      'November lasted 47 months in your soul',
      'a cashier made small talk and your brain blue-screened',
    ],
    sisu: [
      'you gave up during the 8th minute of awkward silence',
      'you admitted you don\'t like sauna and Finland revoked your visa',
      'you used an umbrella instead of embracing the rain like a true Finn',
    ],
  },
  titles: [
    { min: 0, label: 'Tourist with Wet Socks' },
    { min: 3, label: 'Train Station Bench Expert' },
    { min: 7, label: 'Part-time Moomin' },
    { min: 12, label: 'Honorary Sauna Ghost' },
    { min: 20, label: 'Nordic Legend (unofficial)' },
    { min: 30, label: 'Sisu Demigod' },
  ],
  shareTemplate:
    'I survived {days} days in Alternative Finland! Status: {title}. Can you beat my record?',
  shareCopied: 'Copied to clipboard!',
  language: 'Language',
}

const fi: UiStrings = {
  appTitle: 'Suomen Selviytyjä',
  appSubtitle: 'Vaihtoehtoinen Suomi -simulaattori',
  day: 'Päivä',
  choose: 'Valitse kohtalosi',
  swipeHint: 'Pyyhkäise tai napauta valintaa',
  gameOver: 'Peli ohi',
  survived: 'Selvisit',
  shareResult: 'Jaa tulos',
  playAgain: 'Yritä uudelleen',
  secondLife: 'Toinen elämä?',
  watchAd: 'Katso mainos jatkaaksesi',
  premiumPassport: 'Premium-passi',
  buyPremium: 'Osta Premium-passi — 1,99 €',
  premiumOwned: 'Premium aktiivinen',
  premiumSuccess: 'Maksu onnistui! Tervetuloa, kunnia Suomalainen.',
  premiumDemo: 'Demotila — ei oikeaa veloitusta.',
  close: 'Sulje',
  adLabel: 'Mainos',
  adSponsored: 'Sponsoroitu',
  adSkip: 'Jatka',
  stats: {
    terveys: 'Terveys',
    raha: 'Raha',
    mieli: 'Mieli',
    sisu: 'Sisu',
  },
  deathBy: {
    terveys: [
      'söit liikaa mämmiä ja kehosi erosi valtiosta',
      '-35°C tuuli voitti immuunijärjestelmäsi painissa',
      'liukastuit mustalle jäälle Fazer-pussien kanssa',
    ],
    raha: [
      'pankkitilisi kuoli yksinäisyyteen Alko-käyntien jälkeen',
      'HSL-sakot saavuttivat kosmisen tason',
      'yritit maksaa vuokraa salmiakki-kolikoilla',
    ],
    mieli: [
      'sanoit vahingossa "hei" tramppissa tuntemattomalle',
      'marraskuu kesti sielussasi 47 kuukautta',
      'kassahenkilö jutteli ja aivosi kaatui',
    ],
    sisu: [
      'luovutit 8. minuutilla kiusallista hiljaisuutta',
      'myönsit ettei sauna maistu — viisumi peruttiin',
      'käytit sateenvarjoa sijaan että omaksuisit sateen',
    ],
  },
  titles: [
    { min: 0, label: 'Turisti märin sukin' },
    { min: 3, label: 'Aseman penkki-guru' },
    { min: 7, label: 'Osapäivä-Muumi' },
    { min: 12, label: 'Kunnia Sauna-aave' },
    { min: 20, label: 'Pohjoismainen legenda' },
    { min: 30, label: 'Sisu-puolijumala' },
  ],
  shareTemplate:
    'Selvisin {days} päivää Vaihtoehtoisessa Suomessa! Status: {title}. Voitko lyödä ennätykseni?',
  shareCopied: 'Kopioitu leikepöydälle!',
  language: 'Kieli',
}

const ru: UiStrings = {
  appTitle: 'Финское Выживание',
  appSubtitle: 'Симулятор альтернативной Финляндии',
  day: 'День',
  choose: 'Выбери судьбу',
  swipeHint: 'Свайп или нажми на выбор',
  gameOver: 'Конец игры',
  survived: 'Ты продержался',
  shareResult: 'Поделиться (Jaa tulos)',
  playAgain: 'Ещё раз',
  secondLife: 'Вторая жизнь?',
  watchAd: 'Смотреть рекламу и продолжить',
  premiumPassport: 'Премиум-паспорт',
  buyPremium: 'Купить Премиум-паспорт — €1.99',
  premiumOwned: 'Премиум активен',
  premiumSuccess: 'Оплата прошла! Добро пожаловать, почётный финн.',
  premiumDemo: 'Демо-режим — деньги не списываются.',
  close: 'Закрыть',
  adLabel: 'Реклама',
  adSponsored: 'Реклама',
  adSkip: 'Продолжить',
  stats: {
    terveys: 'Terveys (Здоровье)',
    raha: 'Raha (Деньги)',
    mieli: 'Mieli (Настроение)',
    sisu: 'Sisu (Сису)',
  },
  deathBy: {
    terveys: [
      'ты съел слишком много mämmi, и тело подало на развод',
      'ветер -35°C выиграл борьбу с твоим иммунитетом',
      'ты поскользнулся на чёрном льду с 4 пакетами Fazer',
    ],
    raha: [
      'банковский счёт умер от одиночества после Alko',
      'штрафы HSL достигли космических масштабов',
      'ты попытался платить аренду салмиаки-монетами',
    ],
    mieli: [
      'ты случайно сказал «hei» незнакомцу в трамвае',
      'ноябрь в душе длился 47 месяцев',
      'кассир завёл small talk — мозг ушёл в синий экран',
    ],
    sisu: [
      'ты сдался на 8-й минуте неловкой тишины',
      'признался, что не любишь сауну — визу аннулировали',
      'ты взял зонт вместо того, чтобы обнять дождь',
    ],
  },
  titles: [
    { min: 0, label: 'Турист с мокрыми носками' },
    { min: 3, label: 'Эксперт скамьи на вокзале' },
    { min: 7, label: 'Муми-тролль на полставки' },
    { min: 12, label: 'Почётный призрак сауны' },
    { min: 20, label: 'Нордическая легенда' },
    { min: 30, label: 'Полубог Sisu' },
  ],
  shareTemplate:
    'Я продержался {days} дней в Альтернативной Финляндии! Статус: {title}. Сможешь побить рекорд?',
  shareCopied: 'Скопировано в буфер!',
  language: 'Язык',
}

const ui: Record<Locale, UiStrings> = { en, fi, ru }

export function getUi(locale: Locale) {
  return ui[locale]
}

export function getTitle(locale: Locale, days: number): string {
  const titles = ui[locale].titles
  let result = titles[0]!.label
  for (const t of titles) {
    if (days >= t.min) result = t.label
  }
  return result
}

export function getDeathReason(locale: Locale, stat: StatKey): string {
  const reasons = ui[locale].deathBy[stat]
  return reasons[Math.floor(Math.random() * reasons.length)]!
}

export function t(locale: Locale, text: { en: string; fi: string; ru: string }) {
  return text[locale]
}
