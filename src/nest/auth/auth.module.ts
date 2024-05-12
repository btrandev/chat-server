import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ServiceModule } from 'src/services/services.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { WsStrategy } from './ws.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    ServiceModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, WsStrategy ],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}