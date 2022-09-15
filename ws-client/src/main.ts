import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>WS - Client</h3>  

    <input id="jwt" value="" />
    <button id="btnConect">Conectar</button>
    <br>

    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="mensaje" id="message-input" />
    </form>

    <h3>Message</h3>
    <ul id="message-ul"></ul>
    
  </div>
`

const jwt = document.querySelector<HTMLInputElement>('#jwt')
const btnConect = document.querySelector<HTMLButtonElement>('#btnConect')

btnConect?.addEventListener('click', () => {
  if (jwt?.value.trim().length! <=0) return alert('Ingrese JWT')
  connectToServer(jwt?.value!);
})
