import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findLoginUser(email, password);
    const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
