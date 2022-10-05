import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from "./user/user.controller";
import { PostController } from "./post/post.controller";
import { UserService } from "./user/user.service";
import { PostService } from "./post/post.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [AppModule],
  controllers: [AppController, UserController, PostController],
  providers: [
    AppService,
    UserService,
    PostService,
    PrismaService
  ],
})
export class AppModule {}
