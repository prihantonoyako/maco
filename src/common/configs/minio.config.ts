// import { Injectable } from '@nestjs/common';
// import * as AWS from 'aws-sdk';
// import { ConfigService } from '../config/config.service';

// @Injectable()
// export class MinioService {
//   private s3: AWS.S3;

//   constructor(private configService: ConfigService) {
//     this.s3 = new AWS.S3({
//       endpoint: this.configService.minioEndpoint,
//       accessKeyId: this.configService.minioAccessKey,
//       secretAccessKey: this.configService.minioSecretKey,
//       s3ForcePathStyle: true, // Required for MinIO
//       signatureVersion: 'v4',
//     });
//   }

//   async uploadFile(key: string, file: Buffer): Promise<AWS.S3.ManagedUpload.SendData> {
//     return this.s3.upload({
//       Bucket: this.configService.minioBucket,
//       Key: key,
//       Body: file,
//     }).promise();
//   }

//   // Add more methods as needed (e.g., download, delete)
// }
