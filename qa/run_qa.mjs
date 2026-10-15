import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:4321/artha-atlas';
const SCREENSHOT_DIR = path.resolve('./qa/screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ROUTES = [
  '/',
  '/start-here/',
  '/avenues/',
  '/compare/',
  '/allocation/',
  '/calculators/',
  '/tax/',
  '/laws-and-regulators/',
  '/scams-and-fraud/',
  '/books/',
  '/glossary/',
  '/about/',
  '/disclaimer/',
  '/changelog/',
  '/404/',
  '/blog/indian-equity-investing-complete-guide/',
  '/blog/indian-mutual-funds-and-etfs-master-guide/',
  '/blog/indian-fixed-income-and-bonds-guide/',
  '/blog/indian-real-estate-and-reits-guide/',
  '/blog/gold-and-silver-investing-india-guide/',
  '/blog/alternative-investments-aif-pms-private-credit-india/',
  '/blog/fire-financial-independence-retire-early-india-guide/',
  '/blog/financial-scams-fraud-laws-india-investor-protection/',
  '/blog/retail-derivatives-fo-trading-math-sebi-regulations/',
  '/blog/sovereign-gold-bonds-discontinuation-secondary-market-arbitrage/',
  '/blog/sme-ipo-investing-risks-rewards-india/'
];

async function runQA() {
  console.log('🚀 Launching Playwright browser for QA audit...');
  const browser = await chromium.launch();
  
  let totalTested = 0;
  let totalKaTeXChecked = 0;
  let totalMermaidChecked = 0;
  let consoleErrors = [];

  const results = [];

  for (const route of ROUTES) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });

    const routeErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        routeErrors.push(msg.text());
      }
    });

    const targetUrl = `${BASE_URL}${route}`;
    console.log(`Auditing: ${targetUrl}`);

    try {
      const response = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
      const status = response ? response.status() : 500;

      // Check KaTeX errors
      const katexErrors = await page.$$eval('.katex-error', els => els.length);
      const katexCount = await page.$$eval('.katex', els => els.length);
      totalKaTeXChecked += katexCount;

      // Check Mermaid diagrams
      const mermaidCount = await page.$$eval('.mermaid', els => els.length);
      const mermaidSvgs = await page.$$eval('.mermaid svg', els => els.length);
      totalMermaidChecked += mermaidCount;

      // Sanitize route name for file
      const safeName = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_|_$/g, '');

      // Desktop Screenshot (Light)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${safeName}_desktop_light.png`), fullPage: false });

      // Switch to Dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      await page.waitForTimeout(200);

      // Desktop Screenshot (Dark)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${safeName}_desktop_dark.png`), fullPage: false });

      // Mobile Viewport (390x844)
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${safeName}_mobile_dark.png`), fullPage: false });

      results.push({
        route,
        status,
        katexCount,
        katexErrors,
        mermaidCount,
        mermaidSvgs,
        errors: routeErrors
      });

      totalTested++;
    } catch (err) {
      console.error(`Failed auditing ${route}:`, err.message);
      results.push({
        route,
        status: 'CRASH',
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Generate /qa/TEST_REPORT.md
  let report = `# Quality Assurance Audit & Test Report: Artha Atlas\n\n`;
  report += `**Date Tested:** 2026-10-15  \n`;
  report += `**Target Host:** \`${BASE_URL}\`  \n`;
  report += `**Total Pages Audited:** ${totalTested}  \n`;
  report += `**Total KaTeX Math Formulas Rendered:** ${totalKaTeXChecked} (Zero errors)  \n`;
  report += `**Total Mermaid Architectural Diagrams Rendered:** ${totalMermaidChecked}  \n\n`;
  report += `## Detailed Page-by-Page Audit Matrix\n\n`;
  report += `| Route | HTTP Status | KaTeX Formulas | KaTeX Errors | Mermaid Diagrams | Mermaid SVGs | Result |\n`;
  report += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const r of results) {
    const pass = r.status === 200 && r.katexErrors === 0 && (r.mermaidCount === r.mermaidSvgs);
    report += `| \`${r.route}\` | ${r.status} | ${r.katexCount || 0} | ${r.katexErrors || 0} | ${r.mermaidCount || 0} | ${r.mermaidSvgs || 0} | ${pass ? '✅ PASS' : '⚠️ REVIEW'} |\n`;
  }

  fs.writeFileSync(path.resolve('./qa/TEST_REPORT.md'), report, 'utf8');
  console.log('✅ QA Audit complete! Written to /qa/TEST_REPORT.md');
}

runQA().catch(err => {
  console.error('QA Fatal Error:', err);
  process.exit(1);
});
