import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Message extends Document{
    @Prop()
    senderId: string;
    
    @Prop()
    receiverId: string;

    @Prop()
    content: string;

    @Prop()
    timestamp: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);