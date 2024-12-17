import { AppConfig } from '@libs/core';
import { UserLibService } from '@libs/users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type UserObject = Record<string, any>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: ConfigService, readonly userService: UserLibService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("auth.secret"),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.repo.searchOne({ id: payload.sub });

    if (user?.status === AppConfig.get("settings.users.status.inActive")) {
      throw new UnauthorizedException("You account is deactivated please contact admin!");
    }
    return user;
  }
}
