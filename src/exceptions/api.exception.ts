import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
  constructor(response) {
    super(
      {
        error: { ...response },
      },
      HttpStatus.OK,
    )
  }
}
