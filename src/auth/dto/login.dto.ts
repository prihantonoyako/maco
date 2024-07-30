// src/auth/dto/login.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
