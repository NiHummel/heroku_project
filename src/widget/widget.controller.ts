import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('feed_update')
export class WidgetController {

  @Get('feed')
  @Render('feed')
  showPosts() {
    return;
  }
}
