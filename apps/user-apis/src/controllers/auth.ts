import { Request, Response, RestController } from "@libs/core";
import { Dto, Validate } from "@libs/core/validator";
import { UserTransformer } from "@libs/common";
import { Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
import { LoginDto, RegisterDto } from "../dtos";
import { AuthApisService } from "../services";
import { UserApiService } from "../services/user";

@Controller("auth")
export class UserAuthController extends RestController {
  constructor(
    private readonly authService: AuthApisService,
    private readonly userService: UserApiService
  ) {
    super();
  }

  @Get("health")
  async test(@Res() res: Response) {
    return res.success({ message: "auth apis service is working fine" });
  }

  @Validate(LoginDto)
  @Post("/login")
  async login(
    @Dto() inputs: LoginDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const model = await this.authService.loginUser(inputs);
    return res.success(
      await this.transform(model, new UserTransformer(), {
        req,
      })
    );
  }

  @Validate(RegisterDto)
  @Post("/register")
  async register(
    @Dto() inputs: RegisterDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const model = await this.authService.register(inputs);
    return res.success(
      await this.transform(model, new UserTransformer(), {
        req,
      })
    );
  }
}
