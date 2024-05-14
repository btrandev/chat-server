import { RoomService } from './room.service';
import { TestBed } from '@automock/jest';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { getModelToken } from '@nestjs/mongoose';
import { MessageDto } from './dto/message.dto';
import { RemoveMessageDto } from './dto/remove-message.dto';


describe('RoomService', () => {
    let roomService: RoomService;
    let roomModel: Model<Room>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(RoomService).compile();
        roomService = unit;
        roomModel = unitRef.get(getModelToken(Room.name));
    });

    it('should be defined', () => {
        expect(roomService).toBeDefined();
    });

    it('create', async () => {
        const roomDto: CreateRoomDto = {
            name: 'lobby',
            messages: []
        }
        jest.spyOn(roomModel, 'create').mockImplementation(async (room: CreateRoomDto): Promise<any> => {
            return Promise.resolve({
                _id: 1,
                name: room.name,
                messages: room.messages
            });
        })
        const result = await roomService.create(roomDto);
        expect(roomModel.create).toBeCalled();
        expect(result).toEqual({
            _id: 1,
            name: 'lobby',
            messages: []
        });
    })

    it('findRoom', async () => {
        jest.spyOn(roomModel, 'findOne').mockImplementation((): any => {
            return {
                exec: jest.fn()
            }
        })
        await roomService.findRoom('roomName');
        expect(roomModel.findOne).toBeCalled();
    })

    it('addMessage', async () => {
        const messageDto: MessageDto = {
            sender: 1,
            message: 'hello',
            timestamp: Date.now()
        }
        jest.spyOn(roomModel, 'updateOne').mockImplementation((): any => {
            return {
                exec: jest.fn()
            }
        })
        await roomService.addMessage('roomName', messageDto);
        expect(roomModel.updateOne).toBeCalled();
    })

    it('deleteMessage', async () => {
        const messageDto: RemoveMessageDto = {
            sender: 1,
            timestamp: Date.now()
        }
        jest.spyOn(roomModel, 'findOneAndUpdate').mockImplementation((): any => {
            return {
                exec: jest.fn()
            }
        })
        await roomService.deleteMessage('roomName', messageDto);
        expect(roomModel.findOneAndUpdate).toBeCalled();
    })
});