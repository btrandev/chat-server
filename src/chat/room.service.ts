import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private readonly RoomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = await this.RoomModel.create(createRoomDto);
    return createdRoom;
  }

  async addMessage(name: string, message: MessageDto) {
    return this.RoomModel.updateOne({name: {$eq: name}}, {
        "$push": {
            messages: message
        }
    }).exec();
  }

  async findOne(name: string): Promise<Room> {
    return this.RoomModel.findOne({ name }).exec();
  }
}