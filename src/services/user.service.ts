import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findLoginUser(email: string, password: string) {
    if(email === 'abc@gmail.com') {
      return await {
        id: 1,
        email,
        firstName: 'John',
        lastName: 'Doe'
      };
    }
    if(email === 'def@gmail.com') {
      return await {
        id: 2,
        email,
        firstName: 'Jane',
        lastName: 'Doe'
      };
    }
  }
}
