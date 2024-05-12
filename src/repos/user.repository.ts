import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';

export type UserIdentity = Pick<User, 'id'>;
@Injectable()
export class UserRepo {
    
}