import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  private readonly host: string = process.env.RABBITMQ_HOST;
  private readonly port: number = parseInt(process.env.RABBITMQ_PORT, 10);
  private readonly user: string = process.env.RABBITMQ_USER;
  private readonly password: string = process.env.RABBITMQ_PASSWORD;

  private get amqpUrl(): string {
    return `amqp://${this.user}:${this.password}@${this.host}:${this.port}`;
  }

  async onModuleInit() {
    try {
      this.connection = await amqp.connect(this.amqpUrl);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('messages');
      this.logger.log('RabbitMQ connected and queue asserted.');
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
      this.logger.log('RabbitMQ connection closed.');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection:', error.message);
    }
  }

  async sendToQueue(message: string) {
    try {
      this.channel.sendToQueue('messages', Buffer.from(message));
    } catch (error) {
      this.logger.error('Error sending message to queue:', error.message);
    }
  }

  async consumeQueue(callback: (msg: amqp.ConsumeMessage | null) => void) {
    try {
      await this.channel.consume('messages', callback);
    } catch (error) {
      this.logger.error('Error consuming queue:', error.message);
    }
  }
}
