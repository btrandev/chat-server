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
import { Logger, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { RoomService } from './room.service';
import { CurrentUser } from 'src/nest/decorators/user.decor';
import UserDto from 'src/auth/dtos/user.dto';

@WebSocketGateway(8181)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  defaultRoom: string;

  constructor(private wsAuthGurad: WsAuthGuard, private roomService: RoomService) { }

  async afterInit() {
    this.logger.log("Server started");
    let room = await this.roomService.findOne('lobby');
    if(!room) {
      this.logger.log('Creating new room');
      room = await this.roomService.create({name: 'lobby', messages: []});
    }
    this.logger.log('lobby room is ready');
    this.defaultRoom = room.name;
  }

  async handleConnection(client: any) {
    const result = await this.wsAuthGurad.canActivate(client);
    if (!result) {
      client.disconnect();
    } else {
      client.join(this.defaultRoom);
      this.server.to(this.defaultRoom).emit('onMessage', 'a user joined ' + this.defaultRoom);
      const room = await this.roomService.findOne(this.defaultRoom);
      this.server.in(client.id).emit('onMessage', room.messages);
    }
  }


  async handleDisconnect() {
    console.log("a client disconnected");
    this.server.to(this.defaultRoom).emit('onMessage', 'a user left');
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('onMessage')
  onMessage(@MessageBody() data: string, @CurrentUser() user: UserDto) {
    console.log({ data, user });
    const message = {
      sender: user.id,
      message: data,
      timestamp: Date.now()
    }
    this.roomService.addMessage(this.defaultRoom, message);
    this.server.to(this.defaultRoom).emit('onMessage', message);
  }
}