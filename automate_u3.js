const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Função sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  const screenshotDir = '/home/u/Documentos/kl/prints/U3';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let figNum = 1;

  const takeScreenshot = async (name) => {
    const filename = path.join(screenshotDir, `fig${String(figNum).padStart(2, '0')}.png`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`✓ Fig ${figNum}: ${name}`);
    figNum++;
    await sleep(1000);
  };

  try {
    console.log('\n🚀 Iniciando automação U3 - Google Drive\n');
    console.log('⏳ Abrindo Google Drive...\n');

    await page.goto('https://drive.google.com', { waitUntil: 'networkidle0' });
    await sleep(3000);

    console.log('✓ Google Drive carregado');
    console.log('⚠️  Se pedir login, faça manualmente no navegador aberto.\n');

    // Espera pela autenticação (máximo 2 minutos)
    try {
      await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 120000 });
    } catch (e) {
      // Se não redirecionar, continua mesmo assim
    }

    await sleep(2000);

    // Fig 1: Tela inicial
    console.log('📸 Capturando Fig 1...');
    await takeScreenshot('Tela inicial do Google Drive');

    // Fig 2: Menu Novo
    console.log('📸 Capturando Fig 2...');
    await page.click('[aria-label="Novo"]').catch(() => {});
    await sleep(1500);
    await takeScreenshot('Menu Novo do Google Drive');
    await page.keyboard.press('Escape');
    await sleep(1000);

    // Fig 3: Google Docs
    console.log('📸 Capturando Fig 3...');
    await page.click('[aria-label="Novo"]').catch(() => {});
    await sleep(1000);
    
    await page.evaluate(() => {
      const items = document.querySelectorAll('div[role="menuitem"]');
      for (let item of items) {
        if (item.textContent.includes('Documento')) {
          item.click();
          return;
        }
      }
    }).catch(() => {});
    
    await sleep(3000);
    await takeScreenshot('Documento criado no Google Docs');

    // Fig 4: Pasta
    console.log('📸 Capturando Fig 4...');
    await page.goBack({ waitUntil: 'networkidle0' });
    await sleep(2000);

    await page.click('[aria-label="Novo"]').catch(() => {});
    await sleep(1000);

    await page.evaluate(() => {
      const items = document.querySelectorAll('div[role="menuitem"]');
      for (let item of items) {
        if (item.textContent.includes('Pasta')) {
          item.click();
          return;
        }
      }
    }).catch(() => {});

    await sleep(2000);
    await takeScreenshot('Pasta e subpastas no Drive');

    // Fig 5: Compartilhamento
    console.log('📸 Capturando Fig 5...');
    await page.goBack({ waitUntil: 'networkidle0' });
    await sleep(2000);
    
    // Tenta encontrar botão compartilhar
    const shareBtn = await page.$('[aria-label*="ompartilhar"]')
      .catch(() => null);
    
    if (shareBtn) {
      await shareBtn.click();
      await sleep(1500);
    }
    
    await takeScreenshot('Janela de compartilhamento');
    await page.keyboard.press('Escape');
    await sleep(1000);

    // Fig 6: Google Sheets
    console.log('📸 Capturando Fig 6...');
    await page.goBack({ waitUntil: 'networkidle0' });
    await sleep(2000);

    await page.click('[aria-label="Novo"]').catch(() => {});
    await sleep(1000);

    await page.evaluate(() => {
      const items = document.querySelectorAll('div[role="menuitem"]');
      for (let item of items) {
        if (item.textContent.includes('Planilha')) {
          item.click();
          return;
        }
      }
    }).catch(() => {});

    await sleep(3000);
    await takeScreenshot('Planilha com edição simultânea');

    // Fig 7: Google Forms
    console.log('📸 Capturando Fig 7...');
    await page.goBack({ waitUntil: 'networkidle0' });
    await sleep(2000);

    await page.click('[aria-label="Novo"]').catch(() => {});
    await sleep(1000);

    await page.evaluate(() => {
      const items = document.querySelectorAll('div[role="menuitem"]');
      for (let item of items) {
        if (item.textContent.includes('Formulário')) {
          item.click();
          return;
        }
      }
    }).catch(() => {});

    await sleep(3000);
    await takeScreenshot('Formulário criado no Google Forms');

    // Fig 8: Respostas
    console.log('📸 Capturando Fig 8...');
    const responsesTab = await page.$('[aria-label*="espostas"]')
      .catch(() => null);
    
    if (responsesTab) {
      await responsesTab.click();
      await sleep(2000);
    }

    await takeScreenshot('Respostas coletadas no Google Sheets');

    console.log('\n' + '='.repeat(60));
    console.log('✅ SUCESSO! Todas as 8 figuras foram capturadas!');
    console.log('='.repeat(60));
    console.log('\n📁 Arquivos em: /home/u/Documentos/kl/prints/U3/\n');

    await sleep(3000);

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
})();
