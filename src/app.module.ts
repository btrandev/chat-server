import { config } from 'dotenv';
config({ debug: false });

import { Module } from '@nestjs/common';
import { AuthModule } from './nest/auth/auth.module';
import { ServiceModule } from './services/services.module';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './nest/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './nest/auth/local.strategy';
import { ChatModule } from './chat/chat.module';

const Controllers: any[] = [AuthController];

const AppModules = [AuthModule, ServiceModule, ChatModule];


@Module({
  imports: [
    PassportModule,
    ...AppModules,
  ],
  controllers: Controllers,
  providers: [JwtStrategy, LocalStrategy],
})
export class AppModule { }
