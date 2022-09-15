import { Manager, Socket } from 'socket.io-client'

let socket: Socket;
export const connectToServer = (jwt: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            jwt: 'TK',
        }
    })

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListenners()
}


const addListenners = () => {
    const serverStatus = document.querySelector('#server-status')!
    const clientsUl = document.querySelector('#clients-ul')!

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!

    const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!


    socket.on('connect', () => serverStatus.innerHTML = 'Online')

    socket.on('disconnect', () => serverStatus.innerHTML = 'Offline')


    socket.on('clients-update', (clients: string[]) => {
        clientsUl.innerHTML = clients.map(id => `<li>${id}</li>`).join().replaceAll(',', '')
    })

    messageForm.addEventListener('submit', ev => {
        ev.preventDefault();

        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', { id: 'YO', message: messageInput.value })

        messageInput.value = ''
    })


    socket.on('message-from-server', (pl: { fullName: string, msg: string }) => {
        const newMsg = `
        <li>
            <strong>${pl.fullName}</strong>
            <span>${pl.msg}</span>
        </li>
        `
        const li = document.createElement('li');
        li.innerHTML = newMsg

        messageUl.append(li);
    })


}
