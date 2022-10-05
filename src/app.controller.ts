import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Render,
  UseInterceptors
} from '@nestjs/common';
import { TimerInterceptor } from './timer.interceptor';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';


@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  signed_in = false;

  @Get('/')
  @Render('index')
  root() {
    return {
      signed_in: this.signed_in,
      content: 'main'
    };
  };
  @Get('table')
  @Render('index')
  getTable() {
    return {
      signed_in: this.signed_in,
      content: 'table'
    };
  };
  @Get('schedule')
  @Render('index')
  getSchedule() {
    return {
      signed_in: this.signed_in,
      content: 'schedule'
    };
  };

  getHello() {
    return undefined;
  }
}