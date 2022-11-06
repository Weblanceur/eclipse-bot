import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { ChatsService } from './chats.service'

@Processor('pr-bot')
export class PrBotProcessor {
  constructor(private readonly chatsService: ChatsService) {}

  private readonly logger = new Logger('PrBotProcessor')

  @Process('pr-bot')
  async handlePrBot(job: Job) {
    // Проверяем, работает ли бот в беседе или нет
    let peer = null
    if (/2[0-9]+/.test(job.data.message.peer_id)) peer = job.data.message.peer_id

    // Основные части для удобства обращения
    const from = job.data.message.from_id
    const text = job.data.message.text
    const payload = job.data.message.payload
    const bot = job.data.bot
    const botSettings = job.data.bot.settings

    // Объект клавиатуры, пока пустой
    let keyboard = null

    // Только для бесед
    if (peer) {
      // Валидация настроек для чата
      // Стартовый шаг валидации
      let validationError = 'target'
      let newSetting = { botId: bot.id, peerId: peer }
      this.logger.verbose(`Ищем чат в базе, peerId [${peer}]`)
      const chat = await this.chatsService.getChatByPeerId(peer)
      if (chat) {
        console.log(await this.chatsService.validateSettings(newSetting))
      }

      await this.chatsService.setSettings(chat, newSetting)
      keyboard = await this.chatsService.getKeyboardForSettings(validationError)
    }
    this.logger.error('Объект клавиатуры:', keyboard)

    this.logger.warn(job.data.bot)
    this.logger.debug('Start pr-bot...')
    await this.logger.debug(job.data.message)
    this.logger.debug('Pr Bot job completed')
    return
  }
}
