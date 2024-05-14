import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsAuthGuard extends AuthGuard('ws') {

  getRequest(context: any) {
    if (context.switchToWs) {
      return context.switchToWs().getClient();
    }
    if (context.getClient) {
      return context.getClient();
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

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any): TUser {
    const socket = this.getRequest(context);
    if (err || info) {
      socket.disconnect();
    }
    return user;
  }
}
