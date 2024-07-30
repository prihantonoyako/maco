import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ senderId, receiverId, content });
    const savedMessage = await newMessage.save();

    // Notify the receiver via RabbitMQ
    await this.rabbitMQService.sendToQueue(JSON.stringify({
      type: 'MESSAGE_RECEIVED',
      message: savedMessage,
    }));

    return savedMessage;
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageModel.find({ senderId, receiverId }).sort({ timestamp: 1 }).exec();
  }
}
