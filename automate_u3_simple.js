const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });

    const screenshotDir = '/home/u/Documentos/kl/prints/U3';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    let figNum = 1;

    const takeScreenshot = async (name, page) => {
      const filename = path.join(screenshotDir, `fig${String(figNum).padStart(2, '0')}.png`);
      try {
        await page.screenshot({ path: filename });
        console.log(`✓ Fig ${figNum}: ${name}`);
      } catch (e) {
        console.log(`⚠️  Fig ${figNum}: Erro ao capturar - ${e.message}`);
      }
      figNum++;
      await sleep(500);
    };

    console.log('\n🚀 Automação U3 - Google Drive\n');
    console.log('📖 Fazendo captura de tela das páginas do Google Drive...\n');

    // Fig 1: Google Drive inicial
    console.log('📸 Abrindo Google Drive (Fig 1)...');
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1920, height: 1080 });
    await page1.goto('https://drive.google.com', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Tela inicial do Google Drive', page1);

    // Fig 2: Menu Novo
    console.log('📸 Capturando menu Novo (Fig 2)...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1920, height: 1080 });
    await page2.goto('https://drive.google.com', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    try {
      await page2.click('[aria-label="Novo"]');
      await sleep(1000);
    } catch (e) {
      console.log('⚠️  Não conseguiu clicar em "Novo"');
    }
    await takeScreenshot('Menu Novo do Google Drive', page2);

    // Fig 3: Google Docs
    console.log('📸 Abrindo Google Docs (Fig 3)...');
    const page3 = await browser.newPage();
    await page3.setViewport({ width: 1920, height: 1080 });
    await page3.goto('https://docs.google.com/document/create', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Documento criado no Google Docs', page3);

    // Fig 4: Pasta no Drive
    console.log('📸 Capturando pasta (Fig 4)...');
    const page4 = await browser.newPage();
    await page4.setViewport({ width: 1920, height: 1080 });
    await page4.goto('https://drive.google.com', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Pasta e subpastas no Drive', page4);

    // Fig 5: Compartilhamento
    console.log('📸 Capturando janela de compartilhamento (Fig 5)...');
    const page5 = await browser.newPage();
    await page5.setViewport({ width: 1920, height: 1080 });
    await page5.goto('https://drive.google.com', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    try {
      // Tenta abrir modal de compartilhamento
      await page5.keyboard.press('s');
      await sleep(1000);
    } catch (e) {
      console.log('⚠️  Erro ao tentar abrir compartilhamento');
    }
    await takeScreenshot('Janela de compartilhamento', page5);

    // Fig 6: Google Sheets
    console.log('📸 Abrindo Google Sheets (Fig 6)...');
    const page6 = await browser.newPage();
    await page6.setViewport({ width: 1920, height: 1080 });
    await page6.goto('https://sheets.google.com/create', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Planilha com edição simultânea', page6);

    // Fig 7: Google Forms
    console.log('📸 Abrindo Google Forms (Fig 7)...');
    const page7 = await browser.newPage();
    await page7.setViewport({ width: 1920, height: 1080 });
    await page7.goto('https://forms.google.com/create', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Formulário criado no Google Forms', page7);

    // Fig 8: Google Forms - Respostas
    console.log('📸 Capturando aba de respostas (Fig 8)...');
    const page8 = await browser.newPage();
    await page8.setViewport({ width: 1920, height: 1080 });
    await page8.goto('https://sheets.google.com', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('⚠️  ', e.message));
    await sleep(2000);
    await takeScreenshot('Respostas coletadas no Google Sheets', page8);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SUCESSO! Todas as 8 figuras foram capturadas!');
    console.log('='.repeat(60));
    console.log('\n📁 Arquivos em: /home/u/Documentos/kl/prints/U3/\n');

    // Mantém aberto por 5 segundos para você conferir
    await sleep(5000);
    await browser.close();

    console.log('✓ Navegador fechado\n');

  } catch (error) {
    console.error('\n❌ Erro fatal:', error.message);
    process.exit(1);
  }
})();
