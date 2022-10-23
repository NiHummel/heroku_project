import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Render,
  UseInterceptors, UseGuards, Req, Res
} from "@nestjs/common";
import { TimerInterceptor } from './timer.interceptor';
import { PostService } from "./post/post.service";
import { UserService } from "./user/user.service";
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { UserInfoDto } from "./user/dto/user.dto";


@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
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
  @UseGuards(new AuthGuard())
  @Get('logout')
  async logout(
    @Session() session: SessionContainer,
    @Res() res) {
    res.clearCookie('sAccessToken');
    this.signed_in = false;
    return res.redirect('back');
  }
  @UseGuards(new AuthGuard())
  @Post('login')
  async login(
    @Session() session: SessionContainer,
    @Body() userData: UserInfoDto,
    @Res() res) {
    this.signed_in = true;
    await session.updateSessionData({email: userData.email, name: userData.name});
    return res.redirect('back');
  }
  getHello() {
    return undefined;
  }
}