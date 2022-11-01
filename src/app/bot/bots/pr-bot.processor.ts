import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('pr-bot')
export class PrBotProcessor {
  private readonly logger = new Logger('PrBotProcessor')

  @Process('pr-bot')
  async handlePrBot(job: Job) {
    // Проверяем, работает ли бот в беседе или нет
    let peer = null
    if (/20[0-9]+/.test(job.data.message.peer_id)) peer = job.data.message.peer_id
    this.logger.error(peer)
    this.logger.debug('Start pr-bot...')
    await this.logger.debug(job.data.message)
    this.logger.debug('Pr Bot job completed')
    return
  }
}
