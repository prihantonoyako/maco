import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document{
    @Prop()
    user_id: string;
    
    @Prop()
    display_name: string;

    @Prop()
    avatar: string;

    @Prop()
    gender: string;

    @Prop()
    birthday: string;

    @Prop()
    horoscope: string;

    @Prop()
    zodiac: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    interest: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);