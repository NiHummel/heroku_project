import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class UserInfoDto {
  @ApiProperty({
    description: 'User nickname',
    example: 'nhummel',
  })
  @IsNotEmpty({message: "Name should not be empty"})
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'nhummel72@yandex.ru',
  })
  @IsEmail({message: "It's not correct email address"})
  email: string;
}
