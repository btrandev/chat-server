import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { RoomService } from './room.service';
import { CurrentUser } from 'src/nest/decorators/user.decor';
import UserDto from 'src/auth/dtos/user.dto';
import { Socket } from 'src/nest/decorators/socket.decor';

const enum EVENTS {
  join = 'join',
  chat = 'chat',
  leave = 'leave',
  welcome = 'welcome',
  deleteMessage = 'deleteMessage'
}

@WebSocketGateway(8181)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  defaultRoom = 'Lobby';

  constructor(private wsAuthGurad: WsAuthGuard, private roomService: RoomService) { }

  async afterInit() {
    this.logger.log("Server started");
    let room = await this.roomService.findRoom(this.defaultRoom);
    if (!room) {
      this.logger.log('Creating new room');
      room = await this.roomService.create({ name: this.defaultRoom, messages: [] });
      if (!room) {
        throw new WsException('Cannot create room');
      }
    }
    this.logger.log(this.defaultRoom + ' room is ready');
  }

  async handleConnection(socket: any) {
    // TODO: ensure only one socket of a same user at a time
    await this.wsAuthGurad.canActivate(socket);
  }

  async handleDisconnect() {
    console.log("a client disconnected");
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('chat')
  async chat(@MessageBody() data: string, @CurrentUser() user: UserDto) {
    const message = {
      sender: user.id,
      message: data,
      timestamp: Date.now()
    }
    await this.roomService.addMessage(this.defaultRoom, message);
    this.server.to(this.defaultRoom).emit(EVENTS.chat, message);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage(EVENTS.join)
  async join(@CurrentUser() user: UserDto, @Socket() socket: any) {
    // TODO: able to use message body as a room id/name to attach the current socket to that room
    socket.join(this.defaultRoom);
    this.server.to(this.defaultRoom).emit(EVENTS.join, user.firstName + ' joined ' + this.defaultRoom);

    const room = await this.roomService.findRoom(this.defaultRoom);
    this.server.in(socket.id).emit(EVENTS.welcome, room.messages);
  }

  @SubscribeMessage(EVENTS.leave)
  async leave(@CurrentUser() user: UserDto, @Socket() socket: any) {
    socket.disconnect();
    this.server.to(this.defaultRoom).emit(EVENTS.leave, user.firstName + ' left');
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage(EVENTS.deleteMessage)
  async deleteMessage(@CurrentUser() user: UserDto, @MessageBody() data: string) {
    // TODO: in case not message owner return false
    await this.roomService.deleteMessage(this.defaultRoom, {
      sender: user.id,
      timestamp: parseInt(data)
    });
    return true;
  }
}