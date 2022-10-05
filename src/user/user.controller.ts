import { Get, Controller, Render, UseInterceptors, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { User as UserModel } from "@prisma/client";

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  signed_in = false;

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  getHello() {
    return undefined;
  }
}