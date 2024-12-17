import { RabbitMQDriver } from "@libs/core/queue/drivers/rabbitmq";
import { registerAs } from "@nestjs/config";

export default registerAs("queue", () => ({
  default: "rabbitmq", // Default connection to use
  connections: {
    rabbitmq: {
      driver: RabbitMQDriver, // RabbitMQ driver
      options: {
        url: "amqp://localhost:5672", // RabbitMQ URL
        queue: "ingestion_queue", // Default queue name
        queueOptions: {
          durable: true,
        },
      },
    },
  },
}));
