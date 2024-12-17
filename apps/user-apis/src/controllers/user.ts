import { Dto, Validate } from "@libs/core/validator";
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../../../../libs/users/src/guards/jwtGuard";
import {
  CreateDocumentDto,
  GetDocumentDto,
  MediaGenerateLinksDto,
  UpdateDocumentDto,
} from "../dtos";
import { UserApiService } from "../services/user";
import { DocumentsTransformer } from "@libs/common/transformers/user/document";
import { RolesGuard } from "@libs/users/guards";
import { Roles } from "@libs/users/decorators";
import { Request, Response, RestController } from "@libs/core";

@Controller("users")
@UseGuards(JwtGuard, RolesGuard)
export class UserController extends RestController {
  constructor(private readonly userService: UserApiService) {
    super();
  }

  @Get("health")
  @Roles("admin", "editor")
  async test(@Res() res: Response) {
    return res.success({ message: "auth apis service is working fine" });
  }

  @Post("upload-url")
  @Validate(MediaGenerateLinksDto)
  async getUploadUrl(
    @Req() req: Request,
    @Dto() dto: MediaGenerateLinksDto,
    @Res() res: Response
  ): Promise<Response> {
    const signedUrls = await this.userService.getUploadUrls(dto, req.user);
    return res.success(signedUrls);
  }

  @Get("documents")
  @Validate(GetDocumentDto)
  async getdocuments(
    @Dto() dto: GetDocumentDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.getAllDocuments(dto, req.user);
    return res.withMeta(
      await this.paginate(data, new DocumentsTransformer(), {
        req,
      })
    );
  }
  @Get("documents/:id")
  @Validate(GetDocumentDto)
  async getdocumentsByID(
    @Dto() dto: GetDocumentDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.getDocumentsById(dto, req.user);
    return res.success(
      await this.transform(data, new DocumentsTransformer(), {
        req,
      })
    );
  }

  @Put("documents/:id")
  @Validate(UpdateDocumentDto)
  async updatedocuments(
    @Dto() dto: UpdateDocumentDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.updateDocuments(dto, req.user);
    return res.success(
      await this.transform(data, new DocumentsTransformer(), {
        req,
      })
    );
  }

  @Post("documents")
  @Validate(CreateDocumentDto)
  @HttpCode(201)
  async createDocuments(
    @Dto() dto: CreateDocumentDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addDocuments(dto, req.user);
    return res.success(
      await this.transform(data, new DocumentsTransformer(), {
        req,
      })
    );
  }

  @Delete("documents/:id")
  @Validate(GetDocumentDto)
  async deleteDocumentByID(
    @Dto() dto: GetDocumentDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.deleteDocumentById(dto, req.user);
    return res.success("Document deleted Successfully");
  }
}
