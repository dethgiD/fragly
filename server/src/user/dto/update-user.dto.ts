import { IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    displayName: string;
    @IsString()
    email: string;
  }
  