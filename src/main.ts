// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
declare var __dirname: string

let mainWindow: Electron.BrowserWindow | null

function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  const filename = `${__dirname}/index.html`
  const url = `file://${filename}`
  // mainWindow.loadFile(filename)
  mainWindow.loadURL(url)
  mainWindow.on('close', () => {
    mainWindow = null
    app.quit()
  })

  mainWindow.webContents.openDevTools()
}

app.on('ready', () => onReady())
app.on('activate', function () {
  if (mainWindow === null) onReady()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
console.log('Node Version', process.versions.node)
console.log('Electron Version', app.getVersion())
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
