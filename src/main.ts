import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

import AppConfig from './app.config'
import * as fs from 'fs'

async function bootstrap() {
  const PORT = AppConfig.main.port

  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
    cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
  }

  const app = await NestFactory.create(AppModule, { httpsOptions })

  app.enableCors({
    origin: ['http://localhost:5500'],
    credentials: true,
    methods: ['GET, DELETE'],
  })
  await app.listen(PORT, () => {
    console.log(`Eclipse PR Bot started at ${PORT}`)
  })
}
bootstrap()
