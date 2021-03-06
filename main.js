const electron = require('electron')
const {dialog} = require('electron')
var fs = require('fs')

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


function openFile(){
    dialog.showOpenDialog((filenames)=>{
        if(filenames === undefined){
            alert("no files were selected")
            return;
        }
        readFile(filenames[0])
    })
}

function readFile(filepath){
    fs.readFile(filepath, 'utf-8',(err, data)=>{
        if(err){
            alert("There was an error retreiving your file")
            return
        }
        mainWindow.webContents.send('item:add', data)
    })
}


const template = [
    {
        label: "File",
        submenu: [
            {
                label: 'Open',
                click: function(){
                    openFile()
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
                    label:"Clear Items",
                    click(){
                        mainWindow.webContents.send('item:clear')
                    }
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
    mainWindow.webContents.send('item:add', item)
})


