import { IsArray, IsEmpty, IsIn, IsNotEmpty, IsNotIn, isNumber, IsNumber, IsOptional, IsString } from 'class-validator'

export class ChatSettingsDto {
  @IsIn(['member', 'friend', 'like', 'share', 'comment'], { message: 'Выберите режим работы чата' })
  target: string

  @IsArray({ message: 'Нужно указать админов чата' })
  admins: [number] | null
}
