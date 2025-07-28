const { app, BrowserWindow } = require('electron');
const https = require('https');
const path = require('path');

function fetchInjectionHTML() {
  return new Promise((resolve, reject) => {
    https.get('https://pastebin.com/raw/SJaFqDxU', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: false,  // disable isolation so we can inject easier
      nodeIntegration: false,
    }
  });

  await mainWindow.loadURL('https://dashboard.twitch.tv/');

  const html = await fetchInjectionHTML();

  // Escape backticks and backslashes for injection safely
  const safeHTML = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`');

  // Inject HTML inside Twitch sidebar or body
  const script = `
  const sidebar = document.querySelector('[data-test-selector="side-nav"]') || document.body;
  if (sidebar) {
    const container = document.createElement('div');
    container.style.padding = '10px';
    container.style.marginTop = '10px';
    container.style.backgroundColor = '#6441a5'; // Twitch purple vibes
    container.style.borderRadius = '8px';

    const btn = document.createElement('button');
    btn.textContent = 'Exit App';
    btn.style.padding = '8px 16px';
    btn.style.fontSize = '16px';
    btn.style.color = '#fff';
    btn.style.backgroundColor = '#9147ff';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => {
      window.close(); // close the Electron window (exit app)
    });

    container.appendChild(btn);
    sidebar.appendChild(container);
  }
`;


  mainWindow.webContents.executeJavaScript(script).catch(console.error);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
