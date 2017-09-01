// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { remote } = require('electron')

const win = remote.getCurrentWindow()
win.setVibrancy('ultra-dark')

win.webContents.openDevTools({mode: 'detach'})

win.webContents.on('devtools-closed', () => {
  setTimeout(() => {
    console.log('restoring vibrancy')
    win.setVibrancy('ultra-dark')
  }, 1000)
})
