import { IsString } from "class-validator";

export class UpdateAuthCodesDto {
    @IsString()
    gameAuthCode: string;
    @IsString()
    lastMatchCode: string;
  }