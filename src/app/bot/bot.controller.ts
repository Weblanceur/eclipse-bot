import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { BotService } from './bot.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Controller('bot')
export class BotController {
  constructor(@InjectQueue('pr-bot') private readonly prBotQueue: Queue, private botService: BotService) {}

  @Get()
  getBotInfo() {
    return {}
  }

  @Post()
  async runBot() {
    await this.prBotQueue.add('pr-bot', { type: 'Eclipse PrBot' })
  }

  @Post(':id')
  @HttpCode(200)
  start(@Body() body, @Param() params) {
    return this.botService.runBot(body, params.id)
  }
}
