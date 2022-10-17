import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from "class-validator";

export class PostDto {
  @ApiProperty({
    description: 'Text content of post',
    example: "You're breathtaking!",
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Image URL, if you want to add picture to your post',
    example: 'https://www.google.com/logos/fnbx/animal_paws/cat_kp_lm.gif',
  })
  @IsUrl({'message': 'Url is incorrect!'})
  picture?: string;

  @ApiProperty({
    description: 'Uniq author identification via email',
    example: 'nhummel72@yandex.ru',
  })
  @IsEmail()
  authorEmail?: string;
}
