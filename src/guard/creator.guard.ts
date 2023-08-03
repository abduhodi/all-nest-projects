import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.payload.isCreator) {
      throw new ForbiddenException('admin root required');
    }
    return true;
  }
}
