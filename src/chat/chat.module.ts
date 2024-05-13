import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { WsAuthGuard } from "src/auth/ws-auth.guard";
import { WsStrategy } from "src/auth/ws.strategy";
import { RoomService } from "./room.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Room, RoomSchema } from "./schemas/room.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
    providers: [ChatGateway, WsAuthGuard, WsStrategy, RoomService],
})
export class ChatModule { }