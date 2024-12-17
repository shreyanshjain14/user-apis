import { AppConfig } from '@libs/core';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  constructor(protected readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw new UnauthorizedException("Unauthorized");
    }

    if (user?.status === AppConfig.get("settings.users.status.inActive")) {
      throw new UnauthorizedException("You account is deactivated please contact admin!");
    }

    return user;
  }
}
