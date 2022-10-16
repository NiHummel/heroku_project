import { Get, Controller, Render, UseInterceptors, Post, Body, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { Post as PostModel, User as UserModel } from "@prisma/client";
import { UserInfoDto } from "./dto/user.dto";

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  signed_in = false;

  @Get('user/:id')
  async getUserById(@Param('id') id:string): Promise<UserModel> {
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