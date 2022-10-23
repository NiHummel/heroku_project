import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'feed' })
export class WidgetGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('publication')
  handleMessage(@MessageBody() message: string) {
    console.log('publication:', message);
    this.server.emit('publication', message);
  }
}
