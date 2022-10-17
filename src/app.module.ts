import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from "./user/user.controller";
import { PostController } from "./post/post.controller";
import { UserService } from "./user/user.service";
import { PostService } from "./post/post.service";
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [AppModule,
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://bb9166414d8911edaf0539cc8b310def-eu-west-1.aws.supertokens.io:3568",
      apiKey: "sZdYsN3U71wmQsHXlllO6-QL-RmeOV",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/passwordless/appinfo
        appName: "heroku-project",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/",
      },
    }),
    WidgetModule,],
  controllers: [AppController, UserController, PostController],
  providers: [
    AppService,
    UserService,
    PostService,
    PrismaService
  ],
})
export class AppModule {}
