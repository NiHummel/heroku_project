import { Module } from '@nestjs/common';
import { WidgetGateway } from './widget.gateway';
import { WidgetController } from './widget.controller';

@Module({
  providers: [WidgetGateway],
  controllers: [WidgetController],
})
export class WidgetModule {}
