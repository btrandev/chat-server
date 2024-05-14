import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // custom logic can go here
    await super.canActivate(context);
    // custom logic goes here too
    return !!this.getRequest(context)['user'];
  }

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if(err || info) {
      console.log('Unauthorized client');
      // TODO: throw excpetion if unauthorized (token expired). Exception filter also needed in this case
      return null;
    }
      return user;
  }
}
