import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiException } from '../exceptions/api.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value)
    if (!obj) return value
    const errors = await validate(obj, { enableDebugMessages: true })

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join('; ')}`
      })
      console.log(messages)
      throw new ApiException({
        messages,
        status: HttpStatus.OK,
      })
    }
    return value
  }
}
