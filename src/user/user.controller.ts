import { Get, Controller, Render, UseInterceptors, Post, Body, Param, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { UserInfoDto } from "./dto/user.dto";

@ApiTags('User')
@ApiResponse({ status: HttpStatus.OK, description: 'Success' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  signed_in = false;

  @Get('user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }
  @Post('user')
  async signupUser(
    @Body() userData: UserInfoDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  getHello() {
    return undefined;
  }
}