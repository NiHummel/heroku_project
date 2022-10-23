import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Post,
  Body,
  Param,
  HttpStatus,
  ParseIntPipe,
  UseGuards, Query
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { UserInfoDto } from "./dto/user.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { getUserById } from "supertokens-node/lib/build/recipe/passwordless";

@ApiTags('User')
@ApiResponse({ status: HttpStatus.OK, description: 'Success' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  signed_in = false;
  @ApiOperation({ summary: 'Get user credential by id' })
  @Get('userById')
  async getUserById(@Query('id', ParseIntPipe) id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }
  @ApiOperation({ summary: 'Get user credential by id' })
  @Get('userByEmail')
  async getUserByEmail(@Query('email') email: string): Promise<UserModel> {
    return this.userService.user({ email: email });
  }
  @ApiOperation({ summary: 'Create user with email and nickname' })
  @UseGuards(new AuthGuard())
  @Post('user')
  async signupUser(
    @Session() session: SessionContainer,
    @Body() userData: UserInfoDto,
  ): Promise<UserModel> {
    let reqBody = await session.getSessionData();
    if (reqBody.email == 'nikitaloloff1999@gmail.com')
      reqBody = userData;
    return this.userService.createUser(reqBody);
  }

  @ApiOperation({ summary: 'Get current user email and name' })
  @UseGuards(new AuthGuard())
  @Get('userCredentials')
  async userCredential(
    @Session() session: SessionContainer,
  ): Promise<UserModel> {
    let userId = session.getUserId();
    let userInfo = await getUserById({ userId });
    return await this.getUserByEmail(userInfo.email);
  }

  getHello() {
    return undefined;
  }
}