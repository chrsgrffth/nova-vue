const electron = require('electron')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

const path = require('path')
const url = require('url')

const VUEJS_DEVTOOLS = '/Users/chrisg/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/2.3.1_0'

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let mainWindowVisible



function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 640,
    titleBarStyle: 'hidden'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  BrowserWindow.addDevToolsExtension(VUEJS_DEVTOOLS)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('show', function () {
    mainWindowVisible = true
  })

  mainWindow.on('hide', function () {
    mainWindowVisible = false
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    const shortcut = globalShortcut.register('Control+Space', () => {
      if (mainWindowVisible) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    });
    // [Source]
    // http://stackoverflow.com/questions/36893426/bringing-an-electron-app-to-foreground-with-a-global-shortcut-like-spotlight-la

  }
)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.