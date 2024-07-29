const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron')  // Importaçao

//  relacionado ao preload.js (path é o caminho)
const path = require('node:path')

const createWindow = () => {       // Janela Principal
    // nativeTheme.themeSource ='dark'
    const win = new BrowserWindow({
        width: 800, // largura
        height: 600,// altura
        icon: './src/public/img/piggy.png',
        //  resizable: false, // evitar o redimensionamento
        //  titleBarStyle:'hidden'  esconder barra de titulo e menu
        //  autoHideMenuBar: true // esconder menu
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}
// janela sobre
let about // bug de abertura

const aboutWindow = () => {       // Janela Principal
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360, // largura
            height: 220,// altura
            icon: './src/public/img/piggy.png',
            resizable: false, // evitar o redimensionamento
            // titleBarStyle: 'hidden',  esconder barra de titulo e menu
            // autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}

app.whenReady().then(() => {  // executa de forma assincrona a aplicaçao
    createWindow()
})

//  Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            }, {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            }, {
                type: 'separator'

            }, {
                label: 'aplicar zoom',
                role: 'zoomIn'
            }, {
                label: 'Reduzir',
                role: 'zoomOut'
            }, {
                label: 'Restaurar o zoom padrao',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest/')
            },
            {
                type: 'separator'
            },

            {
                label: 'Sobre',
                accelerator: 'Alt+F1',
                click: () => aboutWindow()
            },
        ]
    }

]


// Processos
console.log("Processo Principal")

// exemplo de comando que so funciona no Node.js
console.log(`Electron:${process.versions.electron}`)

// Exemplo 2: recebimento de uma mensagem do renderer

ipcMain.on('send-message', (event, message) => {

    console.log(`processo principal recebeu uma mensagem:${message}`)
})


// Exemplo 3 recebimento de uma açao a ser executada

ipcMain.on("open-about", () => {
    aboutWindow()
})