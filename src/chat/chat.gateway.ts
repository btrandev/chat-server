import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './room';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/nest/auth/ws-auth.guard';
// import { WsStrategy } from 'src/nest/auth/ws.strategy';


@WebSocketGateway(8181)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private wsAuthGurad: WsAuthGuard) { }

  afterInit() {
    console.log("gateway inited");
  }

  async handleConnection(client: any) {
    const result = await this.wsAuthGurad.canActivate(client);
    if (!result) {
      client.disconnect();
    } else {
      client.join('room1');
      this.server.to('room1').emit('onMessage', 'a client connected');
    }
  }


  handleDisconnect() {
    console.log("a client disconnected");
    this.server.to('room1').emit('onMessage', 'a client disconnected');
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('onMessage')
  onMessage(@MessageBody() data: Message) {
    console.log({ data });
    this.server.to('room1').emit('onMessage', data);
  }
}