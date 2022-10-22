import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

import AppConfig from './app.config'

async function bootstrap() {
  const PORT = AppConfig.main.port
  const app = await NestFactory.create(AppModule)
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
