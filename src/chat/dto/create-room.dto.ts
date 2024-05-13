import { MessageDto } from "./message.dto";

export class CreateRoomDto {
    readonly name: string;
    readonly messages: MessageDto[];
}