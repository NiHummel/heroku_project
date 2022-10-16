import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException, HttpStatus
} from "@nestjs/common";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";

@ApiTags('Posting')
@ApiResponse({ status: HttpStatus.OK, description: 'Success' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}
  signed_in = false;

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('_feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { banned: false },
    });
  }

  @Post('post')
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Given picture url is not correct' })
  async createPost(
    @Body() postDto: PostDto,
  ): Promise<PostModel> {
    const { content, picture, authorEmail } = postDto;
    const isImageURL = require('image-url-validator').default;
    if (!picture || await isImageURL(picture)) {
      return this.postService.createPost({
        content,
        picture,
        author: {
          connect: { email: authorEmail }
        }
      });
    } else {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: "Given picture url is not correct"
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Put('ban/:id')
  async banPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { banned: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  getHello() {
    return undefined;
  }
}