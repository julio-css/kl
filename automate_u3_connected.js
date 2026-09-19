const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('\n🔗 Conectando ao Chrome existente...\n');

    // Conecta ao Chrome já aberto
    const browser = await puppeteer.connect({
      browserWSEndpoint: 'ws://127.0.0.1:9222'
    }).catch(async () => {
      // Se não conseguir via websocket, tenta lançar novo chrome com debug
      console.log('⚠️  Não encontrou Chrome com debugging. Iniciando com debugging...\n');
      return await puppeteer.launch({
        headless: false,
        args: [
          '--remote-debugging-port=9222',
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
        defaultViewport: { width: 1920, height: 1080 }
      });
    });

    console.log('✓ Conectado ao Chrome\n');

    const screenshotDir = '/home/u/Documentos/kl/prints/U3';
    const pages = await browser.pages();
    let page = pages[0];

    if (!page) {
      console.log('⚠️  Nenhuma aba aberta. Abrindo Google Drive...');
      page = await browser.newPage();
      await page.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(2000);
    }

    console.log('📸 Capturando as 8 figuras de U3\n');

    // Fig 1
    console.log('📸 Fig 1: Tela inicial do Google Drive...');
    await page.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig01.png') });
    console.log('✓ Fig 1 capturada');
    await sleep(500);

    // Fig 2: Menu Novo
    console.log('📸 Fig 2: Menu Novo...');
    await page.evaluate(() => {
      // Encontra e clica no botão Novo
      const buttons = document.querySelectorAll('button, div[role="button"], [role="button"]');
      for (let btn of buttons) {
        const text = btn.textContent.toLowerCase();
        const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
        if (text.includes('novo') || ariaLabel.includes('novo') || text.includes('create') || ariaLabel.includes('create')) {
          console.log(`Clicando em: ${btn.getAttribute('aria-label') || btn.textContent}`);
          btn.click();
          return;
        }
      }
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig02.png') });
    console.log('✓ Fig 2 capturada');
    await sleep(500);

    // Fecha menu
    await page.keyboard.press('Escape');
    await sleep(500);

    // Fig 3: Google Docs
    console.log('📸 Fig 3: Google Docs...');
    await page.goto('https://docs.google.com/document/create', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig03.png') });
    console.log('✓ Fig 3 capturada');
    await sleep(500);

    // Fig 4: Pasta
    console.log('📸 Fig 4: Pasta e subpastas...');
    await page.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig04.png') });
    console.log('✓ Fig 4 capturada');
    await sleep(500);

    // Fig 5: Compartilhamento
    console.log('📸 Fig 5: Janela de compartilhamento...');
    await page.evaluate(() => {
      // Procura e clica em compartilhar
      const buttons = document.querySelectorAll('button, div[role="button"], [role="button"]');
      for (let btn of buttons) {
        const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
        if (ariaLabel.includes('ompartilhar') || ariaLabel.includes('share')) {
          console.log(`Compartilhar encontrado`);
          btn.click();
          return;
        }
      }
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotDir, 'fig05.png') });
    console.log('✓ Fig 5 capturada');
    await sleep(500);

    // Fecha modal
    await page.keyboard.press('Escape');
    await sleep(500);

    // Fig 6: Google Sheets
    console.log('📸 Fig 6: Google Sheets...');
    await page.goto('https://sheets.google.com/create', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig06.png') });
    console.log('✓ Fig 6 capturada');
    await sleep(500);

    // Fig 7: Google Forms
    console.log('📸 Fig 7: Google Forms...');
    await page.goto('https://forms.google.com/create', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig07.png') });
    console.log('✓ Fig 7 capturada');
    await sleep(500);

    // Fig 8: Respostas
    console.log('📸 Fig 8: Respostas no Google Sheets...');
    await page.goto('https://sheets.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig08.png') });
    console.log('✓ Fig 8 capturada');

    console.log('\n' + '='.repeat(60));
    console.log('✅ TODAS AS 8 FIGURAS DE U3 FORAM CAPTURADAS!');
    console.log('='.repeat(60));
    console.log('\n📁 Arquivos em: /home/u/Documentos/kl/prints/U3/\n');

    // Lista os arquivos
    const files = fs.readdirSync(screenshotDir).sort();
    files.forEach((f, i) => {
      if (f.startsWith('fig')) {
        const size = fs.statSync(path.join(screenshotDir, f)).size;
        console.log(`  ${f}: ${(size / 1024).toFixed(1)}KB`);
      }
    });

    console.log('\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.error(error.stack);
  }
})();
