import { isGuarded } from 'src/test/utils';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { ChatGateway } from './chat.gateway';
import { RoomService } from './room.service';
import { WsException } from '@nestjs/websockets';
import UserDto from 'src/auth/dtos/user.dto';
import { TestBed } from '@automock/jest';


describe('ChatGateway', () => {
    let roomService: RoomService;
    let chatGateway: ChatGateway;
    let wsAuthGuard: WsAuthGuard;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ChatGateway).compile();
        chatGateway = unit;
        wsAuthGuard = unitRef.get(WsAuthGuard);
        roomService = unitRef.get(RoomService);
    });

    it('should be defined', () => {
        expect(chatGateway).toBeDefined();
    });

    describe('isGuarded', () => {
        it(`chat should be protected with WsAuthGuard.`, async () => {
            expect(isGuarded(ChatGateway.prototype.chat, WsAuthGuard)).toBe(true)
        })
        it(`join should be protected with WsAuthGuard.`, async () => {
            expect(isGuarded(ChatGateway.prototype.join, WsAuthGuard)).toBe(true)
        })
        it(`leave should be protected with WsAuthGuard.`, async () => {
            expect(isGuarded(ChatGateway.prototype.leave, WsAuthGuard)).toBe(true)
        })
        it(`deleteMessage should be protected with WsAuthGuard.`, async () => {
            expect(isGuarded(ChatGateway.prototype.deleteMessage, WsAuthGuard)).toBe(true)
        })
    });

    describe('handleConnection', () => {
        const socket: any = {
            disconnect: jest.fn()
        };
        it('WsAuthGuard should be called', async () => {
            jest.spyOn(wsAuthGuard, 'canActivate').mockImplementationOnce(() => Promise.resolve(true));
            await chatGateway.handleConnection(socket);
            expect(wsAuthGuard.canActivate).toHaveBeenCalled();
            expect(socket.disconnect).not.toBeCalled();

        })
        it('disconnect if unauthorized', async () => {
            jest.spyOn(wsAuthGuard, 'canActivate').mockImplementationOnce(() => Promise.resolve(false));
            await chatGateway.handleConnection(socket);
            expect(socket.disconnect).toBeCalled();
        })
    })

    describe('deleteMessage', () => {
        const mockUser: UserDto = {
            id: 1,
            email: 'test',
            firstName: 'test',
            lastName: 'test'
        }
        it('should return true if no exception', async () => {
            jest.spyOn(roomService, 'deleteMessage').mockImplementationOnce(() => Promise.resolve(null));
            expect(await chatGateway.deleteMessage(mockUser, '13333')).toBe(true);
        })
        it('should throw exception', async () => {
            jest.spyOn(roomService, 'deleteMessage').mockImplementationOnce(() => { throw new WsException('failed') });
            expect(chatGateway.deleteMessage(mockUser, '')).rejects.toThrow(WsException);
        })
    })
});