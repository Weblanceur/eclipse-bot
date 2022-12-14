import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { BotController } from './bot.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../../models/users/users.model'
import { Bots } from '../../models/bots/bots.model'
import { UsersBots } from '../../models/users/users-bots.model'
import { BotSettings } from '../../models/bots/bots-settings.model'
import { BullModule } from '@nestjs/bull'
import { PrBotProcessor } from './bots/pr-bot.processor'
import { ChatsService } from './bots/chats.service'
import { BotChats } from '../../models/bots/bots-chats.model'

@Module({
  providers: [BotService, PrBotProcessor, ChatsService],
  controllers: [BotController],
  imports: [
    SequelizeModule.forFeature([User, Bots, UsersBots, BotSettings, BotChats]),
    BullModule.registerQueue({
      name: 'pr-bot',
    }),
  ],
})
export class BotModule {}
