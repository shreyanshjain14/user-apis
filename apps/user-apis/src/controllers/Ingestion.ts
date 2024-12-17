import { Request, Response, RestController } from "@libs/core";
import { Dto, Validate } from "@libs/core/validator";
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { IngestionService } from "../services/ingestion";
import { JwtGuard } from "@libs/users/guards";
import { GetIngestionStatusDto, ListIngestionsDto, StartIngestionDto } from "../dtos/ingestion";


@Controller("ingestions")
@UseGuards(JwtGuard)
export class IngestionController extends RestController {
  constructor(private readonly ingestionService: IngestionService) {
    super();
  }

  @Get("health")
  async health(@Res() res: Response): Promise<Response> {
    return res.success({ message: "Ingestion APIs service is working fine" });
  }

  @Post("start")
  @Validate(StartIngestionDto)
  @HttpCode(201)
  async startIngestion(
    @Dto() dto: StartIngestionDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.ingestionService.startIngestion(dto, req.user);
    return res.success(data);
  }

  @Get(":id/status")
  @Validate(GetIngestionStatusDto)
  async getIngestionStatus(
    @Dto() dto: GetIngestionStatusDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.ingestionService.getIngestionStatus(dto.id, req.user);
    return res.success(data);
  }

  @Get("list")
  @Validate(ListIngestionsDto)
  async listIngestions(
    @Dto() dto: ListIngestionsDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.ingestionService.listIngestions(dto, req.user);
    return res.success(data);
  }
}
