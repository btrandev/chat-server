import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

// TODO: unit test
function extractJwtFromWs() {
  return function (request) {
    const header = request.handshake?.headers['authorization'];
    if (header) {
      return header.split(' ')[1];
    }
    return null;
  };
}

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor() {
    super({
      jwtFromRequest: extractJwtFromWs(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: any) {
    return user;
  }
}