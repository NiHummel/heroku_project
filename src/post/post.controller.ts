import { Get, Controller, Render, UseInterceptors, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from "./post.service";

@ApiTags('Posting')
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

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { banned: false },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() postData: { content: string; picture?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { content, picture, authorEmail } = postData;
    return this.postService.createPost({
      content,
      picture,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { banned: false },
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