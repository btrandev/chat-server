import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { WsStrategy } from './ws.strategy';
import { jwtConstants } from './constants';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, WsStrategy ],
  exports: [AuthService, LocalStrategy, UserService],
})
export class AuthModule {}