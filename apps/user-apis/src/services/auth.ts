import { IUser } from "@libs/common";
import { pick } from "@libs/database/helpers";
import { UserLibService } from "@libs/users";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { LoginDto, RegisterDto } from "../dtos";
import { Utils } from "../utils";

@Injectable()
export class AuthApisService {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserLibService,
    private readonly jwt: JwtService
  ) {}

  /**
   * service for registering a user
   */
  async register(params: RegisterDto): Promise<IUser> {
    const userPayload = pick(params, [
      "contactMobileNumber",
      "password",
      "email",
      "name",
    ]);
    const hashedPassword = await Utils.hashPassword(userPayload.password);
    userPayload.password = hashedPassword;
    userPayload.status = this.config.get("settings.users.status.active");
    userPayload.role = "user";
    const user = await this.userService.repo.create(userPayload);
    const token = await this.generateToken(user);
    return { ...user, token };
  }

  /**
   * service for login user
   */

  async loginUser(params: LoginDto): Promise<IUser> {
    let user: IUser;

    user = await this.userService.repo.searchOne({
      email: params.email,
    });
    await Utils.comparePasswords(params.password, user.password || "");

    // if (!(user.role === "user")) {
    //   throw new UnauthorizedException("Unauthorized");
    // }
    let token = await this.generateToken(user);
    return { token, ...user };
  }

  /**
   * service for admin login
   */

  async adminLogin(params: LoginDto): Promise<IUser> {
    let user = await this.userService.repo.searchOne({
      email: params.email,
    });
    if (!(user.role == "admin")) {
      throw new UnauthorizedException("Unauthorized");
    }
    await Utils.comparePasswords(params.password, user.password || "");
    let token = await this.generateToken(user);
    return { token, ...user };
  }

  async generateToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      role: user.role,
      issuedAt: new Date(),
    };
    const token = this.jwt.sign(payload);
    return token;
  }
}
