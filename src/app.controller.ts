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
import { PostService } from "./post/post.service";
import { UserService } from "./user/user.service";


@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}
  signed_in = true;

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
  @Get('feed')
  @Render('index')
  async getFeed() {
    let feed = await this.postService.posts({where: { banned: false }, orderBy: { id: 'desc' }});
    for (let key in feed) {
      feed[key]["author"] = (await this.userService.user({ id: +feed[key]['authorId'] }))["name"]
    }
    return {
      signed_in: this.signed_in,
      content: 'feed',
      feed: feed
    }
  }

  getHello() {
    return undefined;
  }
}