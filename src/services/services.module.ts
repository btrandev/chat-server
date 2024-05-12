import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { HttpModule } from '@nestjs/axios';

const otherServices = [
  UserService
];

const AllServices = [
  ...otherServices,
];

@Module({
  // imports: [HttpModule],
  providers: AllServices,
  exports: AllServices
})
export class ServiceModule { }
