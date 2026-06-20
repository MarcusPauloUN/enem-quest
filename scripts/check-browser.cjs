// Diagnóstico: abre o jogo no Chromium headless e coleta console errors + screenshot
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const page = await browser.newContext().then(c => c.newPage())

  const logs = []
  page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }))
  page.on('pageerror', err => logs.push({ type: 'pageerror', text: err.message }))

  console.log('Abrindo http://localhost:5173 ...')
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 })
  } catch (e) {
    logs.push({ type: 'goto-error', text: e.message })
  }

  await page.screenshot({ path: 'scripts/screenshot.png', fullPage: true })
  console.log('Screenshot salva em scripts/screenshot.png')

  const errors = logs.filter(l => ['error', 'pageerror', 'goto-error'].includes(l.type))
  const warnings = logs.filter(l => l.type === 'warning')
  const info = logs.filter(l => !['error', 'pageerror', 'goto-error', 'warning'].includes(l.type))

  if (errors.length) {
    console.log('\n=== ERROS ===')
    errors.forEach(e => console.log(`[${e.type}] ${e.text}`))
  } else {
    console.log('\nNenhum erro de console!')
  }

  if (warnings.length) {
    console.log('\n=== WARNINGS ===')
    warnings.forEach(w => console.log(`[warn] ${w.text}`))
  }

  if (info.length) {
    console.log('\n=== LOGS ===')
    info.forEach(l => console.log(`[${l.type}] ${l.text}`))
  }

  await browser.close()
})()
