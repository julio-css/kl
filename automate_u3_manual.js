const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('\n🚀 Capturando U3 com a janela do Chrome aberta\n');

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized'
      ],
      defaultViewport: null
    });

    const pages = await browser.pages();
    let page = pages[0];

    if (!page) {
      page = await browser.newPage();
    }

    console.log('✓ Conectado ao Chrome existente\n');

    const screenshotDir = '/home/u/Documentos/kl/prints/U3';

    // Fig 1: Google Drive
    console.log('📸 Fig 1: Tela inicial do Google Drive...');
    await page.goto('https://drive.google.com', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig01.png') });
    console.log('✓ Fig 1 capturada\n');

    // Fig 2: Menu Novo
    console.log('📸 Fig 2: Menu Novo...');
    await page.evaluate(() => {
      document.querySelectorAll('button, [role="button"]').forEach(btn => {
        if (btn.getAttribute('aria-label')?.includes('Novo')) {
          btn.click();
        }
      });
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig02.png') });
    console.log('✓ Fig 2 capturada\n');

    await page.keyboard.press('Escape');
    await sleep(500);

    // Fig 3: Google Docs
    console.log('📸 Fig 3: Documento Google Docs...');
    await page.goto('https://docs.google.com/document/create', { waitUntil: 'load', timeout: 60000 });
    await sleep(2500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig03.png') });
    console.log('✓ Fig 3 capturada\n');

    // Fig 4: Pasta
    console.log('📸 Fig 4: Pasta e subpastas...');
    await page.goto('https://drive.google.com', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig04.png') });
    console.log('✓ Fig 4 capturada\n');

    // Fig 5: Compartilhamento
    console.log('📸 Fig 5: Janela de compartilhamento...');
    await page.evaluate(() => {
      document.querySelectorAll('[role="button"]').forEach(btn => {
        if (btn.getAttribute('aria-label')?.includes('ompartilhar')) {
          btn.click();
        }
      });
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig05.png') });
    console.log('✓ Fig 5 capturada\n');

    await page.keyboard.press('Escape');
    await sleep(500);

    // Fig 6: Google Sheets
    console.log('📸 Fig 6: Planilha Google Sheets...');
    await page.goto('https://sheets.google.com/create', { waitUntil: 'load', timeout: 60000 });
    await sleep(2500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig06.png') });
    console.log('✓ Fig 6 capturada\n');

    // Fig 7: Google Forms
    console.log('📸 Fig 7: Formulário Google Forms...');
    await page.goto('https://forms.google.com/create', { waitUntil: 'load', timeout: 60000 });
    await sleep(2500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig07.png') });
    console.log('✓ Fig 7 capturada\n');

    // Fig 8: Respostas
    console.log('📸 Fig 8: Respostas no Google Sheets...');
    await page.goto('https://sheets.google.com', { waitUntil: 'load', timeout: 60000 });
    await sleep(2500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig08.png') });
    console.log('✓ Fig 8 capturada\n');

    console.log('='.repeat(60));
    console.log('✅ TODAS AS 8 FIGURAS DE U3 CAPTURADAS COM SUCESSO!');
    console.log('='.repeat(60));

    // Lista arquivos
    console.log('\n📁 Arquivos em: /home/u/Documentos/kl/prints/U3/\n');
    const files = fs.readdirSync(screenshotDir).filter(f => f.startsWith('fig')).sort();
    files.forEach(f => {
      const size = fs.statSync(path.join(screenshotDir, f)).size;
      console.log(`  ✓ ${f}: ${(size / 1024).toFixed(1)}KB`);
    });

    console.log('\n🎉 U3 concluído! Próximo: U1 (NetBeans/CloudSim)\n');

    await sleep(3000);
    await browser.close();

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
})();
