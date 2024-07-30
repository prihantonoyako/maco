import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/schemas/profile.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
      name: Profile.name,
      schema: ProfileSchema,
    }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
