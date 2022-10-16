import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from "class-validator";

export class PostDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsUrl({'message': 'Url is incorrect!'})
  picture?: string;

  @ApiProperty()
  @IsEmail()
  authorEmail: string;
}
