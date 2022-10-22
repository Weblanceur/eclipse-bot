import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('pr-bot')
export class PrBotProcessor {
  private readonly logger = new Logger(PrBotProcessor.name)

  @Process('pr-bot')
  handlePrBot(job: Job<unknown>) {
    this.logger.debug('Start pr-bot...')
    this.logger.debug(job.data)
    this.logger.debug('Pr Bot job completed')
  }
}
