import { Injectable, Logger } from '@nestjs/common'
import { UsersBots } from '../../models/users/users-bots.model'
import { InjectModel } from '@nestjs/sequelize'
import { BotSettings } from '../../models/bots/bots-settings.model'
import { Bots } from '../../models/bots/bots.model'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class BotService {
  constructor(@InjectQueue('pr-bot') private prBotQueue: Queue, @InjectModel(UsersBots) private userBots: typeof UsersBots) {}

  private logger = new Logger('BotService')

  async runBot(body, id) {
    this.logger.debug(JSON.stringify(body))
    // Структура объекта не соответствует ожидаемой
    if (!body.type) return 'С запросом что-то не так'

    // Пропускаем события приглашений
    if (body.type === 'chat_invite_user' || body.type === 'chat_invite_user_by_link') return

    const bot = await this.userBots.findOne({
      where: { id },
      attributes: ['id', 'run'],
      include: [BotSettings, Bots],
    })

    // Выход, если бот не найден
    if (!bot) return `Бот не найден, ид: [${id}]`

    // Выход, если бот не запущен
    if (!bot.run) return `Бот не запущен, ид: [${id}]`

    // Выход, если не настроен
    if (!bot.settings) return `Бот не настроен, ид: [${id}]`

    // Выход, если не совпадает group_id
    if (bot.settings.vkGroupId != body.group_id) return `Возможно, фейковый запрос, ид: [${id}], ид группы: [${body.group_id}]`

    // Выход, если секретный ключ не совпадает
    if (bot.settings.vkSecret != body.secret) return `Неверный секретный ключ, ид: [${id}]`

    // Проверяем, что находится в поле "type"
    switch (body.type) {
      // Если это уведомление для подтверждения адреса...
      case 'confirmation':
        // ...отправляем строку для подтверждения
        return bot.settings.vkConfirm
      // Если это уведомление о новом сообщении...
      case 'message_new':
        // Проверка типа бота и постановка соответствующих задач
        switch (bot.bot.type) {
          case 'pr':
            console.log('pr-bot')
            await this.prBotQueue.add('pr-bot', { bot, message: body.object.message }, { attempts: 1, lifo: true, removeOnComplete: true })
            break
          case 't69':
            break
        }
        break
      default:
        this.logger.warn(`Тип принятого сообщения не обработан: [${body.type}]`)
    }
    return 'ok'
  }
}
