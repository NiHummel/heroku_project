import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class UserInfoDto {
  @ApiProperty()
  @IsNotEmpty({message: "Name should not be empty"})
  name: string;

  @ApiProperty()
  @IsEmail({message: "It's not correct email address"})
  email: string;
}
