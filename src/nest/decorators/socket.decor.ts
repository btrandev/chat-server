import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Socket = createParamDecorator(
  async (_: string, ctx: ExecutionContext) => {
    return ctx.switchToWs().getClient();
  },
);