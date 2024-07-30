import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('api')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Post('sendMessage')
  async sendMessage(
    @Body() body: { senderId: string; receiverId: string; content: string }
  ) {
    return this.messageService.sendMessage(body.senderId, body.receiverId, body.content);
  }

  @Get('viewMessages')
  async viewMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string
  ) {
    return this.messageService.getMessages(senderId, receiverId);
  }
}
