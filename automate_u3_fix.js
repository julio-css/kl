const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('\n🚀 Capturando figuras faltantes de U3\n');

    const screenshotDir = '/home/u/Documentos/kl/prints/U3';

    // Fig 2: Menu Novo
    console.log('📸 Fig 2: Menu Novo do Google Drive...');
    const browser2 = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });
    const page2 = await browser2.newPage();
    await page2.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    
    try {
      await page2.click('[aria-label="Novo"]');
      await sleep(1500);
      await page2.screenshot({ path: path.join(screenshotDir, 'fig02.png') });
      console.log('✓ Fig 2 capturada');
    } catch (e) {
      console.log('⚠️  Erro Fig 2:', e.message);
    }
    await browser2.close();
    await sleep(2000);

    // Fig 3: Google Docs
    console.log('📸 Fig 3: Documento Google Docs...');
    const browser3 = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });
    const page3 = await browser3.newPage();
    await page3.goto('https://docs.google.com/document/create', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    
    try {
      await page3.screenshot({ path: path.join(screenshotDir, 'fig03.png') });
      console.log('✓ Fig 3 capturada');
    } catch (e) {
      console.log('⚠️  Erro Fig 3:', e.message);
    }
    await browser3.close();
    await sleep(2000);

    // Fig 5: Compartilhamento
    console.log('📸 Fig 5: Janela de compartilhamento...');
    const browser5 = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });
    const page5 = await browser5.newPage();
    await page5.goto('https://drive.google.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    
    try {
      // Tenta encontrar um item e clicar em compartilhar
      await page5.evaluate(() => {
        const shareBtn = document.querySelector('[aria-label*="ompartilhar"]') 
          || document.querySelector('[aria-label*="Share"]');
        if (shareBtn) shareBtn.click();
      });
      await sleep(1500);
      await page5.screenshot({ path: path.join(screenshotDir, 'fig05.png') });
      console.log('✓ Fig 5 capturada');
    } catch (e) {
      console.log('⚠️  Erro Fig 5:', e.message);
    }
    await browser5.close();

    console.log('\n' + '='.repeat(60));
    console.log('✅ Figuras faltantes capturadas!');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
})();
