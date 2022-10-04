import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { TimerInterceptor } from './timer.interceptor';
import { readFile } from "fs";


@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
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
}