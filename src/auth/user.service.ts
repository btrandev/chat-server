import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findLoginUser(email: string, _: string) {
    if(email === 'user1@gmail.com') {
      return await {
        id: 1,
        email,
        firstName: 'John',
        lastName: 'Doe'
      };
    }
    if(email === 'user2@gmail.com') {
      return await {
        id: 2,
        email,
        firstName: 'Jane',
        lastName: 'Doe'
      };
    }
    if(email === 'user3@gmail.com') {
      return await {
        id: 3,
        email,
        firstName: 'Josep',
        lastName: 'Doe'
      };
    }
    if(email === 'user4@gmail.com') {
      return await {
        id: 4,
        email,
        firstName: 'Johan',
        lastName: 'Doe'
      };
    }
    if(email === 'user5@gmail.com') {
      return await {
        id: 5,
        email,
        firstName: 'Jake',
        lastName: 'Doe'
      };
    }
    if(email === 'user6@gmail.com') {
      return await {
        id: 6,
        email,
        firstName: 'Jack',
        lastName: 'Doe'
      };
    }
    
  }
}
