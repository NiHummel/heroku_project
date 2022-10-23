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
  HttpException, HttpStatus, UseGuards
} from "@nestjs/common";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { getUserById } from "supertokens-node/lib/build/recipe/passwordless";

@ApiTags('Posting')
@ApiResponse({ status: HttpStatus.OK, description: 'Success' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}
  @ApiOperation({ summary: 'Get post by id' })
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }
  @ApiOperation({ summary: 'Get all posts, that was not banned' })
  @Get('_feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { banned: false },
    });
  }
  @ApiOperation({ summary: 'Create post' })
  @Post('post')
  @UseGuards(new AuthGuard())
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Given picture url is not correct' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Wrong credentials' })
  async createPost(
    @Session() session: SessionContainer,
    @Body() postDto: PostDto,
  ): Promise<PostModel> {
    let { content, picture, authorEmail } = postDto;
    if (!authorEmail) {
      let userId = session.getUserId();
      let userInfo = await getUserById({ userId })
      authorEmail = userInfo.email;
    }
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
  @ApiOperation({ summary: 'Ban post by id' })
  @UseGuards(new AuthGuard())
  @Put('ban/:id')
  async banPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { banned: true },
    });
  }
  @ApiOperation({ summary: 'Delete post by id' })
  @UseGuards(new AuthGuard())
  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  getHello() {
    return undefined;
  }
}