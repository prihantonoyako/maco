import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { Profile } from 'src/schemas/profile.schema';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { getHoroscope } from '../common/utils/horoscope.utils';
import { getChineseZodiac } from '../common/utils/zodiac.utils';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
    ) {}

    async create(id: string, createProfileDTO: CreateProfileDTO) {
        const { birthday } = createProfileDTO;
        const date = new Date(birthday);
        const horoscope = getHoroscope(date);
        const zodiac = getChineseZodiac(date);
        const newProfile = new this.profileModel({
            user_id: id,
            horoscope: horoscope,
            zodiac: zodiac,
            ...createProfileDTO 
        });

        return newProfile.save();
    }

    async findByUserID(user_id: string) {
        return this.profileModel.findOne({ user_id }).exec();
    }

    async update(user_id: string, updateProfileDTO: UpdateProfileDTO) {
        const { birthday, ...updateData } = updateProfileDTO;
 
        if (birthday) {
            const date = new Date(birthday);
            const zodiac = getChineseZodiac(date);
            const horoscope = getHoroscope(date);
            const updatedProfile = await this.profileModel.findOneAndUpdate(
                { user_id: user_id },
                {
                    zodiac: zodiac,
                    horoscope: horoscope,
                    ...updateData
                },
                
                { new: true, runValidators: true }
            ).exec();
            return updatedProfile;
        } else {
            const updatedProfile = await this.profileModel.findOneAndUpdate(
                { user_id: user_id },
                updateData,
                
                { new: true, runValidators: true }
            ).exec();
            return updatedProfile;
        }
    }
}
