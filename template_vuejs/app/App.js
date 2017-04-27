const {app, ipcMain, BrowserWindow,Menu} = require('electron');
const path = require('path')
const url = require('url')

//-- set up the main app menu
var menu_template = require('./inc/app-menu.js');
var main_menu = Menu.buildFromTemplate(menu_template);

//-- set up the main menu items


//-- create a global var for all the windows
var appWindows

/**
 * quit the app when all windows are closed
 */
 app.on('window-all-closed', function() {
   if (process.platform != 'darwin') { app.quit();}
  });

/**
 * main app init
 */
app.on('ready', function(){
  //-- init the main window
  appWindows = new BrowserWindow({
      width: 600,
      height: 300
    });

  appWindows.loadURL(url.format({
      pathname: path.join(__dirname, 'pages/main.html'),
      protocol: 'file:',
      slashes: true
  }))
  //-- open up the dev tools for debugging
  appWindows.openDevTools();
  //apply the main menu
  Menu.setApplicationMenu(main_menu);
  /**
   * unset the appWindows.main variable on close
   */
  appWindows.on('closed', function() {
    appWindows = null;
  });


  /**
   * listeners
   */



});//-- end of app ready
