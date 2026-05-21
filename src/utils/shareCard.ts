import { getTitle } from '../copy/strings'

export function buildShareText(days: number, template: string): string {
  const title = getTitle(days)
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://finnish-survival.game'
  const body = template.replace('{days}', String(days)).replace('{title}', title)
  return `${body}\n\n${siteUrl}`
}

export async function generateShareImage(days: number, title: string): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')!

  const grad = ctx.createLinearGradient(0, 0, 0, 1920)
  grad.addColorStop(0, '#0a1628')
  grad.addColorStop(0.5, '#0f2847')
  grad.addColorStop(1, '#061018')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1080, 1920)

  ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)'
  ctx.lineWidth = 4
  ctx.strokeRect(60, 120, 960, 1680)

  ctx.fillStyle = '#22d3ee'
  ctx.font = 'bold 72px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Finnish Survival', 540, 280)

  ctx.fillStyle = '#e2e8f0'
  ctx.font = '48px system-ui, sans-serif'
  ctx.fillText(String(days), 540, 520)
  ctx.font = '36px system-ui, sans-serif'
  ctx.fillStyle = '#94a3b8'
  ctx.fillText('days survived', 540, 580)

  ctx.fillStyle = '#f8fafc'
  ctx.font = 'bold 42px system-ui, sans-serif'
  wrapText(ctx, title, 540, 720, 900, 52)

  ctx.fillStyle = '#38bdf8'
  ctx.font = '32px system-ui, sans-serif'
  ctx.fillText('Can you beat my record?', 540, 1500)

  ctx.font = '28px system-ui, sans-serif'
  ctx.fillStyle = '#64748b'
  ctx.fillText('🇫🇮 Alternative Finland', 540, 1580)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to create image'))
    }, 'image/png')
  })
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let cy = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, cy)
      line = word + ' '
      cy += lineHeight
    } else {
      line = test
    }
  }
  ctx.fillText(line.trim(), x, cy)
}

export async function shareResult(
  days: number,
  shareTemplate: string,
): Promise<{ copied: boolean; shared: boolean }> {
  const title = getTitle(days)
  const text = buildShareText(days, shareTemplate)
  let shared = false
  let copied = false

  try {
    const blob = await generateShareImage(days, title)
    const file = new File([blob], 'finnish-survival.png', { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: 'Finnish Survival', text, files: [file] })
      shared = true
    }
  } catch {
    /* fallback */
  }

  if (!shared) {
    try {
      await navigator.clipboard.writeText(text)
      copied = true
    } catch {
      /* ignore */
    }
  }

  return { copied, shared }
}
