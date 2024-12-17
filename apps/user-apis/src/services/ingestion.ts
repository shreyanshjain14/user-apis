import { Injectable, NotFoundException } from "@nestjs/common";
import { ListIngestionsDto, StartIngestionDto } from "../dtos/ingestion";
import { QueueService } from "@libs/core";

@Injectable()
export class IngestionService {
  private ingestionLogs: Map<string, string> = new Map(); // Simulate storage

  constructor(private readonly queueService: QueueService) {}

  async startIngestion(dto: StartIngestionDto, user: any) {
    const ingestionId = `ingestion_${Date.now()}`;
    const message = {
      id: ingestionId,
      userId: user.id,
      ...dto,
      timestamp: new Date(),
    };

    // Simulate storing ingestion status
    this.ingestionLogs.set(ingestionId, "In Progress");

    // Send message to queue
    await this.queueService.sendMessage("rabbitmq", "ingestion.start", message);

    return { ingestionId, message: "Ingestion started successfully" };
  }

  async getIngestionStatus(id: string, user: any) {
    const status = this.ingestionLogs.get(id);
    if (!status) {
      throw new NotFoundException("Ingestion not found");
    }
    return { id, status, userId: user.id };
  }

  async listIngestions(dto: ListIngestionsDto, user: any) {
    const ingestionList = Array.from(this.ingestionLogs.entries())
      .slice(dto.offset || 0, (dto.offset || 0) + (dto.limit || 10))
      .map(([id, status]) => ({ id, status }));

    return { ingestionList, userId: user.id };
  }
}
