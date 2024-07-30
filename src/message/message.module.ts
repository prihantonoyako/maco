import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { MessageService } from './message.service';
import { MessagesController } from './message.controller';
import { MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]), RabbitMQModule],
  providers: [MessageService],
  controllers: [MessagesController],
  exports: [MessageService],
})
export class MessageModule {}
