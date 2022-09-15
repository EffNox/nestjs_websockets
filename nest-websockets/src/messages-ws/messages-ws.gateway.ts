import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) { }

  async handleConnection(client: Socket) {
    const tk = client.handshake.headers.jwt as string;
    // throw new WsException('No Token');
    try {
      // let pl= this.jwtService.verify(tk)

      // console.log(`➥ ~ Cliente conectado`, client.id);
      this.messagesWsService.registerClient(client,/* pl.id */)
    } catch (er) {
      client.disconnect();
      return;
    }

    // console.log({ conectados: this.messagesWsService.getConnectedClients() });
    // client.emit('',wss)
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClients())
  }

  handleDisconnect(client: Socket) {
    // console.log(`➥ ~ Cliente desconectado`, client.id);
    this.messagesWsService.removeClient(client.id)
    // console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClients())

  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, pl: MessageDto) {
    // throw new WsException('Invalid data');

    console.log(`➥ ~ pl`, pl);

    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   msg: pl.message || 'No msg'
    // })

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      msg: pl.message || 'No msg'
    })

  }


}
