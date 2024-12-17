// src/core/rabbitmq.driver.ts

import { QueueDriver } from "../interfaces";
import { connect, Channel, Connection } from 'amqplib';

export class RabbitMQDriver implements QueueDriver {
  private channel: Channel;

  constructor(private options: any) {
    this.connectToQueue();
  }

  // Establish connection and channel to RabbitMQ
  private async connectToQueue() {
    const connection: Connection = await connect(this.options.url);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.options.queue, { durable: this.options.queueOptions.durable });
  }

  // Send message to RabbitMQ queue
  async send(pattern: string, data: any): Promise<void> {
    this.channel.sendToQueue(pattern, Buffer.from(JSON.stringify(data)));
  }
}
