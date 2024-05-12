import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser(email: string, password: string) {
    return await this.userService.findLoginUser(email, password);
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
