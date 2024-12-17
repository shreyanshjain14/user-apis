import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { QueueDriver, QueueOptions } from "./interfaces";

@Injectable()
export class QueueService {
  private options: QueueOptions;
  private static connections: Record<string, QueueDriver> = {};

  constructor(private config: ConfigService) {
    this.options = config.get<QueueOptions>("queue");

    for (const connName in this.options.connections) {
      const connection = this.options.connections[connName];
      const driver = connection.driver;
      QueueService.connections[connName] = new driver(connection.options);
    }
  }

  // Get a specific queue connection, defaulting to the configured default connection
  static getConnection(connection?: string): QueueDriver {
    const options = QueueService.getMetadata();
    connection = connection || options.default;
    return QueueService.connections[connection];
  }

  // Send a message to a specific queue connection
  async sendMessage(
    connection: string | undefined,
    pattern: string,
    data: any
  ) {
    const queue = QueueService.getConnection(connection);
    if (queue) {
      await queue.send(pattern, data);
    } else {
      throw new Error(`Queue connection not found for: ${connection}`);
    }
  }

  // Get metadata, which could be used for default connection or other settings
  static getMetadata(): QueueOptions {
    return {
      default: "rabbitmq",
      connections: {}, // Connection details will be dynamically populated
    } as QueueOptions;
  }
}
