import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
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

  @Get(':id')
  startGet(@Body() body, @Param() params) {
    return this.botService.runBot(body, params.id)
  }

  @Post(':id')
  start(@Body() body, @Param() params, @Res() res) {
    return res.status(HttpStatus.OK).send(this.botService.runBot(body, params.id))
  }
}
