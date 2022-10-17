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
  UseGuards
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { UserInfoDto } from "./dto/user.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";

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
  @Get('user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }
  @ApiOperation({ summary: 'Create user with email and nickname' })
  @UseGuards(new AuthGuard())
  @Post('user')
  async signupUser(
    @Session() session: SessionContainer,
    @Body() userData: UserInfoDto,
  ): Promise<UserModel> {
    return this.userService.createUser(await session.getSessionData());
  }

  getHello() {
    return undefined;
  }
}