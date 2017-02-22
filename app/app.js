const {app, ipcMain, BrowserWindow} = require('electron');

let browserWindow;

var createWindow = function CreateWindow(){
  if (!browserWindow) {
    // Create the browser window.
    let browserWindow = new BrowserWindow();

    // and load the index.html of the app.
    browserWindow.loadURL(`file://${__dirname}/www/index.html`)

    // Open the DevTools.
    // browserWindow.webContents.openDevTools();

    browserWindow.webContents.on('did-finish-load', () => {
      browserWindow.webContents.send('window-resized', browserWindow.getContentSize());
    });
    
    browserWindow.on('resize',  () => {
      browserWindow.webContents.send('window-resized', browserWindow.getContentSize());
    });

    browserWindow.on('closed', () => {
      browserWindow = null;
    });
  };
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
 createWindow();
});

app.on('activate', () => {
 createWindow();
});

// Checking bi-directionnal messages from and to ui
ipcMain.on('message-from-ui', (event, data) => {
  setTimeout(() => {
    event.sender.send('message-from-electron', 'Hello WebKit !');
  }, 1000);
});
