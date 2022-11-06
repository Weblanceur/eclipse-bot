import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { ChatsService } from './chats.service'
import { VK } from 'vk-io'
import getRandomInt from '../../../utils/getRandomInt'

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

    // Подключаем бибилиотеку АПИ ВК с токеном группы
    const vk = new VK({ token: botSettings.vkAccessKey })

    // Отправляемое сообщение (заполняется в процессе обработки)
    let message = null
    // Объект клавиатуры, пока пустой
    let keyboard = null

    // Только для бесед (настройка чата)
    if (peer) {
      // Валидация настроек для чата
      // Стартовый шаг валидации
      let validationError = 'target'
      let newSetting = { botId: bot.id, peerId: peer }
      this.logger.verbose(`Ищем чат в базе, peerId [${peer}]`)
      const chat = await this.chatsService.getChatByPeerId(peer)
      if (chat) {
        const validation = await this.chatsService.validateSettings(newSetting)
        console.log(validation)
        validationError = validation[0].property
        message = Object.values(validation[0].constraints)[0]
      }

      await this.chatsService.setSettings(chat, newSetting)
      keyboard = await this.chatsService.getKeyboardForSettings(validationError)
    }

    // Отправляем сообщение
    if (message) {
      this.logger.error('Сообщение:', message)
      this.logger.error('Объект клавиатуры:', keyboard)
      /*const send = await vk.api.messages.send({
        peer_id: peer || from,
        group_id: botSettings.group_id,
        message,
        keyboard,
        expire_ttl: 3600,
        random_id: getRandomInt(),
        lang: 'ru',
        v: 5.131,
      })*/
      console.log(
        await vk.api.messages.send({
          peer_id: peer || from,
          group_id: botSettings.group_id,
          message,
          keyboard,
        }),
      )
    }

    this.logger.debug('Pr Bot job completed')
    return
  }
}
