import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { ServiceModule } from 'src/services/services.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { WsStrategy } from './ws.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // PassportModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    ServiceModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, WsStrategy, JwtService ],
  exports: [AuthService, LocalStrategy, JwtService],
})
export class AuthModule {}