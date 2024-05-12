import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard extends AuthGuard('ws') {

  getRequest(context: ExecutionContext) {
    if(context.switchToWs) {
      return context.switchToWs().getClient();
    }
    return context;
  }

  getResponse(context: ExecutionContext) {
    return context;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   // custom logic can go here
  //   (await super.canActivate(context)) as boolean; // this is necessary due to possibly returning `boolean | Promise<boolean> | Observable<boolean>
  //   // custom logic goes here too
  //   const request = this.getRequest(context);
  //   return await !!request['user'];
  // }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any): TUser {
    if(err || info) {
      context.send("Unauthorized");
      // context.disconnect();
    }
      return user;
  }
}
