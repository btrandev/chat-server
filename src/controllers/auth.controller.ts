import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/nest/auth/auth.service';
import { LocalAuthGuard } from 'src/nest/auth/local-auth.guard';
import LoginDto from 'src/common/dtos/login.dto';
import { JwtAuthGuard } from 'src/nest/auth/jwt-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req, @Body() loginDto: LoginDto) {
    // const { access_token } = await this.authService.login(req.user);
    // return { user: req.user, access_token };
    return req.user;
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  async test() {
    return 'test';
  }
}
