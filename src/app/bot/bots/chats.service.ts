import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BotChats } from '../../../models/bots/bots-chats.model'
import { ChatSettingsDto } from '../../../dto/chat-settings.dto'

import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, Validator } from 'class-validator'

@Injectable()
export class ChatsService {
  constructor(@InjectModel(BotChats) private botChats: typeof BotChats) {}

  private logger = new Logger('ChatsService')
  readonly validator = new Validator()

  /*
   *  Массив с настройками чата:
   *      target          - режим работы (member, friend, like, share, comment)
   *      chat_admin    - список идов админов чата
   *      vip           - список vip (предусловие)
   *      count         - счётчик входа (условие)
   *      warnings      - счётчик предупреждений
   *      timer         - время исчезновения сообщений
   *      use_blacklist - использовать глобальный ЧС бота
   *      clear_chat    - чистый чат (только ссылки ВК)
   *      kick_bots     - выгонять других ботов
   *      complete      - настройки завершены
   */

  async getChatByPeerId(peerId) {
    return await this.botChats.findOne({ where: { peerId } })
  }

  async getChatMember(peerId) {
    return await this.botChats.findOne({ where: { peerId } })
  }

  async getChatMembers(peerId) {
    return await this.botChats.findOne({ where: { peerId } })
  }

  async validateSettings(data: ChatSettingsDto) {
    const entity = plainToInstance(ChatSettingsDto, data)
    return await this.validator.validate(entity)
  }

  async getKeyboardForSettings(name: string) {
    let jsonButtons = { inline: true, buttons: [] }

    const buttons = {
      target: [
        { payload: 'member', label: 'Вступления в группу', color: 'secondary' },
        { payload: 'friend', label: 'Набор друзей', color: 'secondary' },
        { payload: 'like', label: 'Обмен лайками', color: 'secondary' },
        { payload: 'share', label: 'Обмен репостами', color: 'secondary' },
        { payload: 'comment', label: 'Обмен комментами', color: 'secondary' },
      ],
      chat_admin: 'админы чата',
      stop_words: 'стоп слова',
      vip: 'випы',
      count: 'счётчик условий',
      warnings: 'предупреждения, удаляет за количество нарушений (clear_chat)',
      timer: 'таймер удаления (сек)',
      use_blacklist: [
        { payload: 1, label: 'Работа с ЧС', color: 'secondary' },
        { payload: 0, label: 'Без ЧС', color: 'secondary' },
      ],
      clear_chat: [
        { payload: 1, label: 'Чистить чат', color: 'secondary' },
        { payload: 0, label: 'Пусть флудят', color: 'secondary' },
      ],
      kick_bots: [
        { payload: 1, label: 'Пинать чужих ботов', color: 'secondary' },
        { payload: 0, label: 'Безудержное веселье (нет)', color: 'secondary' },
      ],
    }

    if (Array.isArray(buttons[name])) {
      buttons[name].forEach((value) => {
        jsonButtons.buttons.push([
          { action: { type: 'text', payload: `{\"button\": \"${value.payload}\"}`, label: value.label }, color: value.color },
        ])
      })

      return JSON.stringify(jsonButtons)
    }

    return null
  }

  async setSettings(chat, settings) {
    if (chat) {
      return await this.botChats.update(settings, { where: { id: chat.id } })
    } else {
      return await this.botChats.create(settings)
    }
  }
}
