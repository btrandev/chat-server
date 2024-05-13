import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
