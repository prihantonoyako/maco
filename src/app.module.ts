import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from './message/message.module';
import { AppConfigService } from './common/configs/app-config.config';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MessageModule,
    ProfileModule,
    AuthModule,
    MongooseModule.forRoot(AppConfigService.prototype.mongoUri, {
      dbName: AppConfigService.prototype.mongoDb
    // MongooseModule.forRoot("mongodb://root:toor@127.0.0.1", {
    // MongooseModule.forRoot("mongodb+srv://prihantonoyako:DCjI2x2tJfYro3uq@maco.abesqus.mongodb.net", {
      // dbName: 'maco',
    }),
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
