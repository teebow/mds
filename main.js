const { app, BrowserWindow, Menu } = require('electron')
const { menubar } = require('menubar')
const path = require('path')

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win

const mb = menubar({
    index: path.join('file://', __dirname, '/src/index.html'),
    icon: path.join(__dirname, '/assets/IconTemplate.png'),
    browserWindow: {
        width: 280,
        height: 480,
        x: 10,
        y: 20
    },
    resizable: true,
    showDockIcon: true,
    preloadWindow: true
})

const createWindow = () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    // and load the index.html of the app.
    //win.loadFile('index.html')
    //mb.window.openDevTools();
    // Ouvre les DevTools.
    //win.webContents.openDevTools()

    mb.showWindow()
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
//app.on('ready', createWindow)


mb.on('ready', createWindow)

mb.on('show', function show() {
    mb.window.webContents.send('show')
})

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
        createWindow()
    }
})

// Menu template and shortcuts
const template = [{
    label: 'Temps',
    submenu: [
        { label: 'About Temps', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit() } }
    ]
},
{
    label: 'Edit',
    submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
        { type: 'separator' },
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload()
            }
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
        }
    ]
}, {
    label: 'Actions',
    submenu: [
        { label: 'Details', accelerator: 'CmdOrCtrl+D', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('toggle-details') } },
        { label: 'Settings', accelerator: 'CmdOrCtrl+S', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('toggle-settings') } },
        { type: 'separator' },
        { label: 'Reload Data', accelerator: 'CmdOrCtrl+E', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('reload-data') } },
        { label: 'Favorite City', accelerator: 'CmdOrCtrl+F', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('favorite-city') } },
        { label: 'Randomn City', accelerator: 'CmdOrCtrl+W', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('random-city') } },
        { label: 'Geolocation', accelerator: 'CmdOrCtrl+G', click: function(item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.send('geolocation') } }
    ]
}
]