const electron = require('electron')
//const app = electron.app
//const BrowserWindow = electron.BrowserWindow
//const Menu = electron.Menu
const {dialog} = require('electron')

const{app, BrowserWindow, Menu, ipcMain} = electron

//Start the app
app.on('ready', function(){
    //Creates new window
    mainWindow = new BrowserWindow({
 })

//Loads html into the window
 mainWindow.loadURL(`file://${__dirname}/index.html`)

//Build menu from Template and then Insert
 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)
 
//When app is closed
    mainWindow.on('closed', function(){
        app.quit()
    })
})

var showOpen = function(){
    dialog.showOpenDialog({properties: ['openFile'],})
}


const template = [
    {
        label: "File",
        submenu: [
            {
                label: 'Open',
                click: function(){
                   showOpen()
                }
            },
        ]
       },{
            label:"Edit",
            submenu:[
                {
                    label:"Add Item",
                    click(){
                        addWindow()
                    }
                },
                {
                    type: "separator"
                },
                {
                    label:"Clear Items"
                },
                {
                    type: "separator"
                },
                {
                    label: "Quit",
                    click: function(){
                        app.quit()
                    },
                    accelerator: 'Ctrl+Q'
                }
                
            ]      
    },{
        label:"Dev Tools",
        click: function(item, focusedWindow){
            focusedWindow.toggleDevTools()
        },
        accelerator: 'ctrl+I'
    }
]

//Window for adding items
function addWindow(){
    //Creates add window
    createAddWindow = new BrowserWindow({
        width: 350,
        height: 250,
        title: 'Add a task'
    })
   
   //Loads html into the window
 createAddWindow.loadURL(`file://${__dirname}/addWindow.html`)
 
}

//Catch item:add
ipcMain.on('item:add', function(e, item){
    console.log(item)
    mainWindow.webContents.send('item:add', item)
})
