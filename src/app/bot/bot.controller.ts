import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { BotService } from './bot.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Controller('eclipse2')
export class BotController {
  constructor(private botService: BotService) {}

  @Get()
  getBotInfo() {
    return {}
  }

  @Post(':id')
  @HttpCode(200)
  start(@Body() body, @Param() params) {
    return this.botService.runBot(body, params.id)
  }
}
