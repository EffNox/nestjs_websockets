import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        // user:User
    }
}

@Injectable()
export class MessagesWsService {
    private connectedClients: ConnectedClients = {}



    registerClient(client: Socket, userId?: string) {
        // const user = await findOneBy({userId})
        this.connectedClients[client.id] = { socket: client,/* user */ };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId]
    }

    getConnectedClients() {
        return Object.keys(this.connectedClients)
    }

    getUserFullName(socketId: string) {
        return "User";
        // return this.connectedClients[socketId].user.fullName
    }

    /* private checkUserConnection(user: User) {
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            if (connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect()
                break;
            }
        }
    } */

}
