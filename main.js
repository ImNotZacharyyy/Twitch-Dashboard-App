const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // 🔥 This removes the default title bar
    webPreferences: {
      nodeIntegration: false
    }
  });

  // Optional: remove menu (File/Edit/View/etc.)
  Menu.setApplicationMenu(null);

  // Load the Twitch Dashboard
  win.loadURL('https://dashboard.twitch.tv/');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
