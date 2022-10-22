import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { BotModule } from './bot/bot.module'
import AppConfig from '../app.config'
import { ScheduleModule } from '@nestjs/schedule'
import { SequelizeModule } from '@nestjs/sequelize'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    JwtModule.register({
      secret: AppConfig.main.secret || 'SeCReT',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: AppConfig.db.host,
      port: AppConfig.db.port,
      database: AppConfig.db.name,
      username: AppConfig.db.user,
      password: AppConfig.db.pass,
      autoLoadModels: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
