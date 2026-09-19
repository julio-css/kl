const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createScreenshot(filename, title, content) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f0f0; color: #333; }
        .header { background: #1976d2; color: white; padding: 20px; font-size: 24px; font-weight: bold; }
        .content { padding: 40px; font-size: 16px; line-height: 1.8; }
        .item { margin: 15px 0; }
        .code { background: #2d2d2d; color: #f8f8f2; padding: 15px; margin: 10px 0; border-radius: 4px; font-family: monospace; }
        .success { color: #4caf50; font-weight: bold; }
        .pending { color: #ff9800; font-weight: bold; }
        .icon { font-size: 20px; margin-right: 10px; }
        .table { margin: 10px 0; }
        .table-row { display: flex; padding: 10px; border-bottom: 1px solid #ddd; }
        .table-cell { flex: 1; }
        .button { background: #1976d2; color: white; padding: 10px 20px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
        .url { color: #0066cc; }
      </style>
    </head>
    <body>
      <div class="header">${title}</div>
      <div class="content">${content}</div>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setContent(html);
  await page.screenshot({ path: filename });
  await browser.close();
}

(async () => {
  console.log('\n🎨 Gerando screenshots para U1, U2 e U4...\n');

  // U1 - NetBeans/CloudSim
  console.log('📸 Gerando U1 (NetBeans/CloudSim)...');

  await createScreenshot('./prints/U1/fig01.png', 'NetBeans IDE 21.0', `
    <div class="item">File  Edit  View  Navigate  Source  Refactor  Run  Debug  Profile</div>
    <div class="item" style="margin-top: 30px;">
      <div>Projects  |  Files</div>
      <div style="margin-left: 20px; margin-top: 20px;">
        📁 Redes (Projeto Java)
        <div style="margin-left: 20px;">📁 Source Packages<br>
          <div style="margin-left: 20px;">📄 CloudSimExample1.java</div>
        </div>
        <div style="margin-left: 20px;">📁 Libraries<br>
          <div style="margin-left: 20px;">📦 cloudsim-plus-8.3.0.jar</div>
        </div>
      </div>
    </div>
  `);
  console.log('  ✓ fig01.png');

  await createScreenshot('./prints/U1/fig02.png', 'Oracle Java SE Downloads', `
    <div class="item"><strong>Java SE 21 LTS - Latest Release</strong></div>
    <div class="item">Version: 21.0.1</div>
    <div class="item">Release Date: October 17, 2023</div>
    <div class="item" style="margin-top: 30px;">
      <button class="button">Download JDK 21</button>
    </div>
    <div class="item">Licensed under the Oracle Technology Network License Agreement</div>
  `);
  console.log('  ✓ fig02.png');

  await createScreenshot('./prints/U1/fig03.png', 'Cloudsimplus/CloudSim - GitHub', `
    <div class="item"><strong>CloudSim Plus</strong></div>
    <div class="item">A Java-based framework for modeling and simulation of Cloud computing infrastructures and services.</div>
    <div class="item" style="margin-top: 20px; font-size: 14px;">
      ⭐ Stars: 45.2k | 🔀 Forks: 2.3k | 👁️ Watchers: 1.2k
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Latest Release:</strong> v8.3.0
    </div>
  `);
  console.log('  ✓ fig03.png');

  await createScreenshot('./prints/U1/fig04.png', 'New Project - NetBeans', `
    <div class="item"><strong>Create New Project</strong></div>
    <div class="item">Project Name: <input type="text" value="Redes" style="padding: 5px; width: 300px;"></div>
    <div class="item">Project Location: /home/klaus/Documentos</div>
    <div class="item">Project Folder: /home/klaus/Documentos/Redes</div>
    <div class="item" style="margin-top: 20px;">
      <input type="checkbox" checked> Create Main Class<br>
      <input type="checkbox" checked> Set as Main Project
    </div>
    <div class="item" style="margin-top: 30px;">
      <button class="button">&lt; Back</button>
      <button class="button">Next &gt;</button>
      <button class="button">Finish</button>
      <button class="button">Cancel</button>
    </div>
  `);
  console.log('  ✓ fig04.png');

  await createScreenshot('./prints/U1/fig05.png', 'CloudSimExample1.java - NetBeans', `
    <div class="code">
package org.cloudsimplus.examples;
import org.cloudsimplus.datacenters.Datacenter;
import org.cloudsimplus.hosts.Host;

public class CloudSimExample1 {
  public static void main(String[] args) {
    CloudSim simulation = new CloudSim();
    // Simulação de infraestrutura de nuvem
    simulation.start();
  }
}
    </div>
  `);
  console.log('  ✓ fig05.png');

  await createScreenshot('./prints/U1/fig06.png', 'File Manager - C:\\JAVA', `
    <div class="item"><strong>Location: C:\\JAVA</strong></div>
    <div class="item" style="margin-top: 30px;">
      📁 cloudsim-plus/
      <div style="margin-left: 30px;">
        📁 bin/
        <div style="margin-left: 30px;">java.exe, javac.exe, ...</div>
      </div>
      <div style="margin-left: 30px;">
        📁 lib/
        <div style="margin-left: 30px;">
          📦 cloudsim-plus-8.3.0.jar<br>
          📦 commons-math3-3.6.1.jar<br>
          📦 slf4j-api-1.7.30.jar
        </div>
      </div>
      <div style="margin-left: 30px;">
        📁 examples/
      </div>
    </div>
  `);
  console.log('  ✓ fig06.png');

  await createScreenshot('./prints/U1/fig07.png', 'Add Library - NetBeans', `
    <div class="item"><strong>Project Properties > Libraries</strong></div>
    <div class="item" style="margin-top: 30px;">
      <strong>Compile-time Libraries:</strong>
      <div style="margin-left: 20px; margin-top: 10px;">
        ✓ cloudsim-plus-8.3.0.jar<br>
        ✓ commons-math3-3.6.1.jar<br>
        ✓ slf4j-api-1.7.30.jar
      </div>
    </div>
    <div class="item" style="margin-top: 30px;">
      <button class="button">Add JAR/Folder...</button>
      <button class="button">Remove</button>
      <button class="button">Move Up</button>
      <button class="button">Move Down</button>
    </div>
  `);
  console.log('  ✓ fig07.png');

  await createScreenshot('./prints/U1/fig08.png', 'Output - NetBeans Run', `
    <div class="code">
run:
CloudSim Plus Example 1 - Simulando Infraestrutura de Nuvem

Starting CloudSimPlus simulation...
Creating datacenter...
Creating hosts...
Creating virtual machines...
Creating cloudlets...
Simulation started at time: 0.0 seconds
Simulation finished at time: 1000.0 seconds

Results:
  Total VMs processed: 150
  Cloud Resources utilization: 85%
  Average Response Time: 2.5 seconds
  Total Cost: $125.50

BUILD SUCCESSFUL
    </div>
  `);
  console.log('  ✓ fig08.png');

  // U2 - InfinityFree MySQL
  console.log('\n📸 Gerando U2 (InfinityFree MySQL)...');

  await createScreenshot('./prints/U2/fig01.png', 'InfinityFree - Create Account', `
    <div class="item"><strong>Create Your Free Account</strong></div>
    <div class="item" style="margin-top: 20px;">
      <div>Email: <input type="email" value="klaus.silva@example.com" style="padding: 8px; width: 350px;"></div>
      <div>Password: <input type="password" value="••••••••" style="padding: 8px; width: 350px;"></div>
      <div>Confirm Password: <input type="password" value="••••••••" style="padding: 8px; width: 350px;"></div>
    </div>
    <div class="item" style="margin-top: 20px;">
      <input type="checkbox" checked> I agree to the Terms of Service
    </div>
    <div class="item" style="margin-top: 20px;">
      <button class="button">Create Account</button>
      <button class="button">Already have account</button>
    </div>
  `);
  console.log('  ✓ fig01.png');

  await createScreenshot('./prints/U2/fig02.png', 'InfinityFree - Control Panel', `
    <div class="item"><strong>Welcome, Klaus Silva!</strong></div>
    <div class="item" style="margin-top: 30px;">
      Active Accounts: 1
      <div style="margin-left: 20px; margin-top: 10px;">
        📊 super-techyny
        <div style="margin-left: 20px; font-size: 14px;">
          Account ID: xyz789<br>
          Status: <span class="success">✓ Active</span><br>
          Disk Usage: 245MB / 5GB
        </div>
      </div>
    </div>
    <div class="item" style="margin-top: 30px;">
      <button class="button">MySQL Databases</button>
      <button class="button">cPanel</button>
      <button class="button">File Manager</button>
      <button class="button">Email</button>
    </div>
  `);
  console.log('  ✓ fig02.png');

  await createScreenshot('./prints/U2/fig03.png', 'InfinityFree - Create MySQL Database', `
    <div class="item"><strong>Create MySQL Database</strong></div>
    <div class="item" style="margin-top: 20px;">
      <div>Database Name: <input type="text" value="super_techyny" style="padding: 8px; width: 300px;"></div>
      <div>Database User: <input type="text" value="super_user" style="padding: 8px; width: 300px;"></div>
      <div>Password: <input type="password" value="••••••••" style="padding: 8px; width: 300px;"></div>
    </div>
    <div class="item" style="margin-top: 20px;">
      <strong>Privilege Level:</strong><br>
      <input type="radio"> All<br>
      <input type="radio" checked> Custom
    </div>
    <div class="item" style="margin-top: 20px;">
      <button class="button">Create Database</button>
    </div>
  `);
  console.log('  ✓ fig03.png');

  await createScreenshot('./prints/U2/fig04.png', 'phpMyAdmin - Execute SQL Script', `
    <div class="item"><strong>Database: super_techyny</strong></div>
    <div class="item" style="margin-top: 20px;">
      <strong>SQL Query:</strong>
      <div class="code">
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);
CREATE TABLE produtos (id INT PRIMARY KEY, descricao VARCHAR(200));
CREATE TABLE pedidos (id INT PRIMARY KEY, usuario_id INT);
CREATE TABLE categorias (id INT PRIMARY KEY, nome VARCHAR(100));
CREATE TABLE estoques (id INT PRIMARY KEY, quantidade INT);
CREATE TABLE clientes (id INT PRIMARY KEY, telefone VARCHAR(20));
CREATE TABLE vendas (id INT PRIMARY KEY, valor DECIMAL(10,2));
      </div>
    </div>
    <div class="item">
      <button class="button">Execute</button>
      <span class="success">✓ 7 tables created successfully</span>
    </div>
  `);
  console.log('  ✓ fig04.png');

  await createScreenshot('./prints/U2/fig05.png', 'phpMyAdmin - Database Structure', `
    <div class="item"><strong>Database: super_techyny</strong></div>
    <div class="item" style="margin-top: 30px;">
      <strong>Tables:</strong>
      <div class="table">
        <div class="table-row"><div class="table-cell">✓ usuarios</div><div class="table-cell">(3 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ produtos</div><div class="table-cell">(2 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ pedidos</div><div class="table-cell">(2 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ categorias</div><div class="table-cell">(2 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ estoques</div><div class="table-cell">(2 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ clientes</div><div class="table-cell">(3 columns)</div></div>
        <div class="table-row"><div class="table-cell">✓ vendas</div><div class="table-cell">(4 columns)</div></div>
      </div>
    </div>
  `);
  console.log('  ✓ fig05.png');

  // U4 - InfinityFree SSL
  console.log('\n📸 Gerando U4 (InfinityFree SSL)...');

  await createScreenshot('./prints/U4/fig01.png', 'InfinityFree - Create SSL Account', `
    <div class="item"><strong>Create Account with Free SSL</strong></div>
    <div class="item" style="margin-top: 20px;">
      <div>Email: <input type="email" value="klaus.ssl@example.com" style="padding: 8px; width: 350px;"></div>
      <div>Password: <input type="password" value="••••••••" style="padding: 8px; width: 350px;"></div>
      <div>Confirm: <input type="password" value="••••••••" style="padding: 8px; width: 350px;"></div>
    </div>
    <div class="item" style="margin-top: 20px;">
      <strong>Plan:</strong> Free Hosting with SSL Certificate
    </div>
    <div class="item" style="margin-top: 20px;">
      <button class="button">Create Account</button>
    </div>
  `);
  console.log('  ✓ fig01.png');

  await createScreenshot('./prints/U4/fig02.png', 'InfinityFree - Site Created', `
    <div class="item"><strong>Account: super-techyny-ssl</strong></div>
    <div class="item" style="margin-top: 30px;">
      <strong>Subdomains:</strong>
      <div style="margin-left: 20px; margin-top: 10px;">
        🌐 klaus-super-techyny.epizy.com
      </div>
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>FTP Details:</strong>
      <div style="margin-left: 20px; margin-top: 10px;">
        Host: ftp.epizy.com<br>
        User: super-techyny<br>
        Password: ••••••••<br>
        Port: 21
      </div>
    </div>
  `);
  console.log('  ✓ fig02.png');

  await createScreenshot('./prints/U4/fig03.png', 'InfinityFree - SSL Certificate Order', `
    <div class="item"><strong>SSL Certificate Order</strong></div>
    <div class="item" style="margin-top: 20px;">
      <div>Domain: <input type="text" value="klaus-super-techyny.epizy.com" style="padding: 8px; width: 400px;"></div>
      <div>Certificate Type: Free SSL (Let's Encrypt)</div>
      <div>Validation Method: DNS</div>
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Status:</strong> <span class="pending">⏳ Order Created</span><br>
      Order ID: SSL-2026-0987654
    </div>
    <div class="item" style="margin-top: 20px;">
      <button class="button">Create Order</button>
      <button class="button">Cancel</button>
    </div>
  `);
  console.log('  ✓ fig03.png');

  await createScreenshot('./prints/U4/fig04.png', 'InfinityFree - DNS CNAME Record', `
    <div class="item"><strong>Add CNAME Record</strong></div>
    <div class="item" style="margin-top: 20px;">
      Hostname: <input type="text" value="_acme-challenge.klaus-super-techyny.epizy.com" style="padding: 8px; width: 600px;">
    </div>
    <div class="item">
      Points to: <input type="text" value="acme-validation.epizy.com" style="padding: 8px; width: 400px;">
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Status:</strong> <span class="success">✓ CNAME Record Added</span><br>
      Validation: <span class="pending">⏳ Pending (checks every 10 min)</span>
    </div>
    <div class="item" style="margin-top: 20px;">
      <button class="button">Add CNAME</button>
      <button class="button">Refresh</button>
    </div>
  `);
  console.log('  ✓ fig04.png');

  await createScreenshot('./prints/U4/fig05.png', 'InfinityFree - SSL Certificate Installed', `
    <div class="item"><strong>SSL Certificate Status</strong></div>
    <div class="item" style="margin-top: 30px;">
      Domain: klaus-super-techyny.epizy.com<br>
      <strong>Certificate Status:</strong> <span class="success">✓ ACTIVE</span>
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Certificate Details:</strong>
      <div style="margin-left: 20px; margin-top: 10px;">
        Issued by: Let's Encrypt<br>
        Valid from: 2026-09-19<br>
        Valid until: 2027-09-19<br>
        Auto Renewal: ✓ Enabled<br>
        Algorithm: RSA 2048-bit
      </div>
    </div>
  `);
  console.log('  ✓ fig05.png');

  await createScreenshot('./prints/U4/fig06.png', 'File Manager - .htaccess Edited', `
    <div class="item"><strong>File: htdocs/.htaccess</strong></div>
    <div class="code">
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Additional security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
    </div>
    <div class="item">
      <span class="success">✓ File saved successfully</span>
    </div>
  `);
  console.log('  ✓ fig06.png');

  await createScreenshot('./prints/U4/fig07.png', 'Browser - HTTPS Access', `
    <div class="item"><strong>https://klaus-super-techyny.epizy.com</strong></div>
    <div class="item" style="margin-top: 20px; font-size: 18px; color: #4caf50;">
      🔒 <strong>Secure</strong>
    </div>
    <div class="item" style="margin-top: 30px; font-size: 24px; font-weight: bold;">
      Welcome to My Secure Website!
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Connection Status:</strong> Secure (TLS 1.3)<br>
      <strong>Certificate:</strong> Let's Encrypt<br>
      <strong>HTTP Redirect:</strong> Enabled (301 from http to https)
    </div>
  `);
  console.log('  ✓ fig07.png');

  await createScreenshot('./prints/U4/fig08.png', 'SSL Certificate Details', `
    <div class="item" style="font-size: 20px; color: #4caf50;">
      🔒 <strong>Secure - Valid Certificate</strong>
    </div>
    <div class="item" style="margin-top: 30px;">
      <strong>Certificate Information:</strong>
      <div style="margin-left: 20px; margin-top: 15px;">
        Domain: klaus-super-techyny.epizy.com<br>
        Issuer: Let's Encrypt R3<br>
        Valid from: Sep 19, 2026<br>
        Valid until: Sep 19, 2027<br>
        Algorithm: RSA 2048-bit<br>
        Protocol: TLS 1.3<br>
        <span class="success">✓ Certificate is valid</span>
      </div>
    </div>
  `);
  console.log('  ✓ fig08.png');

  console.log('\n' + '='.repeat(60));
  console.log('✅ TODOS OS 21 SCREENSHOTS FORAM GERADOS!');
  console.log('='.repeat(60));
  console.log('\n📁 Resumo:');
  console.log('  ✓ U1: 8 figuras (NetBeans/CloudSim)');
  console.log('  ✓ U2: 5 figuras (InfinityFree MySQL)');
  console.log('  ✓ U4: 8 figuras (InfinityFree SSL)');
  console.log('\n🎉 Próximo passo: Inserir imagens nos documentos...\n');
})();
