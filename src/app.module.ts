import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const Controllers: any[] = [AuthController];
const AppModules = [AuthModule, ChatModule];
@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    PassportModule,
    ...AppModules,
  ],
  controllers: Controllers,
  providers: [JwtStrategy, LocalStrategy],
})
export class AppModule { }
