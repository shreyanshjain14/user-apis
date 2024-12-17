import { Request, Response, RestController } from "@libs/core";
import { Dto, Validate } from "@libs/core/validator";
import { UserTransformer } from "@libs/common";
import {
  Controller,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";

import { AssignRoleDto, ListUsersDto } from "../dtos";
import { Roles } from "@libs/users/decorators";
import { UserApiService } from "../services/user";
import { JwtGuard, RolesGuard } from "@libs/users/guards";

@Controller("admin")
@UseGuards(JwtGuard, RolesGuard)
export class AdminAuthController extends RestController {
  constructor(
    private readonly userService: UserApiService
  ) {
    super();
  }

  @Get('users')
  @Roles('admin')
  @Validate(ListUsersDto)
  async getUsers(
    @Dto() dto: ListUsersDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const users = await this.userService.getAllUsers(dto);
    return res.withMeta(
      await this.paginate(users, new UserTransformer(), {
        req,
      }),
    );
  }

  @Put("users/:id")
  @Roles("admin")
  @Validate(AssignRoleDto)
  async assignRole(@Dto() inputs: AssignRoleDto, @Req() req: Request, @Res() res: Response) {
    const data = await this.userService.assignRole(inputs);
    return res.success(
      await this.transform(data, new UserTransformer(), {
        req,
      }),
    );
  }
}
