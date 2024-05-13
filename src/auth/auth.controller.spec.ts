
import { isGuarded } from 'src/test/utils';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthController', () => {

    beforeEach(async () => {
    });

    describe('isGuarded', () => {
        it(`login should be protected with LocalAuthGuard.`, async () => {
            expect(isGuarded(AuthController.prototype.login, LocalAuthGuard)).toBe(true)
        })
        it(`test should be protected with JwtAuthGuard.`, async () => {
            expect(isGuarded(AuthController.prototype.test, JwtAuthGuard)).toBe(true)
        })
    });
});