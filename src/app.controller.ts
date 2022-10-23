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
import { getUserById } from "supertokens-node/lib/build/recipe/passwordless";

@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  async signed_in(@Session() session: SessionContainer) {
    console.log(session)
    if (!session)
      return false
    let userId = session.getUserId();
    let userInfo = await getUserById({ userId });
    return await this.userService.user({ email: userInfo.email });
  }
  @UseGuards(new AuthGuard({sessionRequired: false}))
  @Get('/')
  @Render('index')
  async root(@Session() session: SessionContainer) {
    return {
      signed_in: await this.signed_in(session),
      content: 'main'
    };
  };
  @UseGuards(new AuthGuard({sessionRequired: false}))
  @Get('table')
  @Render('index')
  async getTable(@Session() session: SessionContainer) {
    return {
      signed_in: await this.signed_in(session),
      content: 'table'
    };
  };
  @UseGuards(new AuthGuard({sessionRequired: false}))
  @Get('schedule')
  @Render('index')
  async getSchedule(@Session() session: SessionContainer) {
    return {
      signed_in: await this.signed_in(session),
      content: 'schedule'
    };
  };
  @UseGuards(new AuthGuard({sessionRequired: false}))
  @Get('feed')
  @Render('index')
  async getFeed(@Session() session: SessionContainer) {
    let feed = await this.postService.posts({where: { banned: false }, orderBy: { id: 'desc' }});
    for (let key in feed) {
      feed[key]["author"] = (await this.userService.user({ id: +feed[key]['authorId'] }))["name"]
    }
    return {
      signed_in: await this.signed_in(session),
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
    res.clearCookie('sIdRefreshToken');
    return res.redirect('back');
  }

  @UseGuards(new AuthGuard())
  @Post('login')
  async login(
    @Session() session: SessionContainer,
    @Body() userData: UserInfoDto,
    @Res() res) {
    await session.updateSessionData({email: userData.email, name: userData.name});
    return res.redirect('back');
  }
  getHello() {
    return undefined;
  }
}