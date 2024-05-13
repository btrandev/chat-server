import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  messages: [{
    sender: string,
    message: string,
    timestamp: number
  }];
}

export const RoomSchema = SchemaFactory.createForClass(Room);