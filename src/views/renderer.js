// processo de renderizaçao   do documento index . html
 
console.log("Processo  de Renderização")
 
 
 
 
// exemplo de comando que so funciona no Node.js
console.log(`Electron:${api.verElectron()}`)

// emvio de uma mensagem
api.hello("Alo galera de cowboy")

// recebimento de uma menssagem
api.answer((event, message) => {
   console.log(`processo de renderização recebeu uma mensagem: ${message}`)
})

 
// funçao que é executada quando o botao for clicado
 
function sobre(){
   api.openAbout()
}