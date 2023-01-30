import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, ErrorI, MessageI, SendNumbersDTO } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-messages')
  getMessages(): Promise<MessageI[] | ErrorI> {
    return this.appService.getMessage();
  }

  @Get('get-numbers')
  getNumbers(): Promise<SendNumbersDTO[] | ErrorI> {
    return this.appService.getNumbers();
  }

  @Post('send-message')
  sendMessage(@Body() message: MessageI) {
    return this.appService.sendMessage(message);
  }

  @Post('send-numbers')
  sendNumbers(@Body() body: SendNumbersDTO) {
    return this.appService.sendNumber(body);
  }
}
