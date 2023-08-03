import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req?.payload?.isCreator) {
      return true;
    }
    if (+req?.params?.id !== req?.payload?.id) {
      throw new ForbiddenException('Action denied');
    }
    return true;
  }
}
