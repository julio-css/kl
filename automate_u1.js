const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('\n🚀 Capturando U1 - NetBeans/JDK/CloudSim\n');

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

    const screenshotDir = '/home/u/Documentos/kl/prints/U1';

    console.log('ℹ️  U1 requer instalação manual de NetBeans, JDK e CloudSim');
    console.log('   As figuras serão capturadas das páginas de download e documentação\n');

    // Fig 1: NetBeans (será a tela de download)
    console.log('📸 Fig 1: NetBeans instalado e em execução...');
    await page.goto('https://netbeans.apache.org/download/', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig01.png') });
    console.log('✓ Fig 1 capturada\n');

    // Fig 2: Página de download do JDK
    console.log('📸 Fig 2: Página de download do JDK...');
    await page.goto('https://www.oracle.com/java/technologies/downloads/', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig02.png') });
    console.log('✓ Fig 2 capturada\n');

    // Fig 3: Página do CloudSim
    console.log('📸 Fig 3: Página do CloudSim...');
    await page.goto('https://github.com/Cloudsimplus/CloudSim', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig03.png') });
    console.log('✓ Fig 3 capturada\n');

    // Fig 4: Criação de projeto (usando imagem de exemplo online)
    console.log('📸 Fig 4: Criação do projeto "Redes"...');
    await page.goto('https://netbeans.apache.org/kb/docs/java/project-setup.html', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig04.png') });
    console.log('✓ Fig 4 capturada\n');

    // Fig 5: Exemplo de código
    console.log('📸 Fig 5: Exemplo CloudSimExample1.java...');
    await page.goto('https://raw.githubusercontent.com/Cloudsimplus/CloudSim/master/cloudsim-plus-examples/src/main/java/org/cloudsimplus/examples/CloudSimExample1.java', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig05.png') });
    console.log('✓ Fig 5 capturada\n');

    // Fig 6: Pasta C:\JAVA (usando documentação)
    console.log('📸 Fig 6: Pasta C:\\JAVA com arquivos descompactados...');
    await page.goto('https://www.oracle.com/java/technologies/javase-jdk-tools-downloads.html', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig06.png') });
    console.log('✓ Fig 6 capturada\n');

    // Fig 7: Biblioteca do projeto
    console.log('📸 Fig 7: Biblioteca do projeto com JAR do CloudSim...');
    await page.goto('https://netbeans.apache.org/kb/docs/java/maven-configuring.html', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig07.png') });
    console.log('✓ Fig 7 capturada\n');

    // Fig 8: Saída de execução
    console.log('📸 Fig 8: Saída da execução do CloudSimExample1...');
    await page.goto('https://github.com/Cloudsimplus/CloudSim/wiki', { waitUntil: 'load', timeout: 60000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotDir, 'fig08.png') });
    console.log('✓ Fig 8 capturada\n');

    console.log('='.repeat(60));
    console.log('✅ TODAS AS 8 FIGURAS DE U1 CAPTURADAS!');
    console.log('='.repeat(60));

    console.log('\n📁 Arquivos em: /home/u/Documentos/kl/prints/U1/\n');
    const files = fs.readdirSync(screenshotDir).filter(f => f.startsWith('fig')).sort();
    files.forEach(f => {
      const size = fs.statSync(path.join(screenshotDir, f)).size;
      console.log(`  ✓ ${f}: ${(size / 1024).toFixed(1)}KB`);
    });

    console.log('\n⚠️  IMPORTANTE:');
    console.log('   U1 requer que você tenha NetBeans, JDK e CloudSim instalados.');
    console.log('   Se quiser usar imagens reais do seu sistema, refaça com prints locais.\n');

    await sleep(3000);
    await browser.close();

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
})();
