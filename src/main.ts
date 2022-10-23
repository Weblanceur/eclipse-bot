import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

import AppConfig from './app.config'
import * as fs from 'fs'

async function bootstrap() {
  const PORT = AppConfig.main.port

  const httpsOptions = {
    key: fs.readFileSync('/home/admin/conf/web/ssl.eclipse-vk.ru.key'),
    cert: fs.readFileSync('/home/admin/conf/web/ssl.eclipse-vk.ru.crt'),
  }

  const app = await NestFactory.create(AppModule, { httpsOptions })

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  })
  await app.listen(PORT, () => {
    console.log(`Eclipse PR Bot started at ${PORT}`)
  })
}
bootstrap()
