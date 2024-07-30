import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppConfigService {
  get mongoUri(): string {
    return process.env.MONGO_URI;
  }

  get mongoDb(): string {
    return process.env.MONGO_DB;
  }

  get minioEndpoint(): string {
    return process.env.MINIO_ENDPOINT;
  }

  get minioAccessKey(): string {
    return process.env.MINIO_ACCESS_KEY;
  }

  get minioSecretKey(): string {
    return process.env.MINIO_SECRET_KEY;
  }

  get minioBucket(): string {
    return process.env.MINIO_BUCKET;
  }
}
