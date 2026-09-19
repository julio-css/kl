const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('\n📸 Capturando Fig 2: Menu Novo\n');

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();
    await page.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);

    // Tenta vários seletores para encontrar o botão Novo
    const found = await page.evaluate(() => {
      // Tenta vários seletores
      const selectors = [
        '[aria-label="Novo"]',
        '[aria-label="Create"]',
        'button[aria-label*="Novo"]',
        'button[aria-label*="ovo"]',
        'div[role="button"][aria-label*="Novo"]'
      ];

      for (let selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
          console.log(`Encontrado: ${selector}`);
          el.click();
          return true;
        }
      }

      // Tenta encontrar por texto
      const buttons = document.querySelectorAll('button, div[role="button"]');
      for (let btn of buttons) {
        if (btn.textContent.includes('Novo') || btn.textContent.includes('Create')) {
          console.log(`Encontrado por texto: ${btn.textContent}`);
          btn.click();
          return true;
        }
      }

      return false;
    });

    console.log(`Botão encontrado: ${found}`);
    await sleep(2000);

    const screenshotDir = '/home/u/Documentos/kl/prints/U3';
    await page.screenshot({ path: path.join(screenshotDir, 'fig02.png') });
    console.log('✓ Fig 2 capturada com sucesso!');

    await sleep(2000);
    await browser.close();

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
})();
