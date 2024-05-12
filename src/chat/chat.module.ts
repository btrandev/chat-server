import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { WsAuthGuard } from "src/nest/auth/ws-auth.guard";
import { WsStrategy } from "src/nest/auth/ws.strategy";

@Module({
    providers: [ChatGateway, WsAuthGuard, WsStrategy],
})
export class ChatModule { }