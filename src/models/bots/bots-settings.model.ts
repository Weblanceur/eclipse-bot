import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { UsersBots } from '../users/users-bots.model'

@Table({ tableName: 'bots_settings', timestamps: false })
export class BotSettings extends Model {
  @ForeignKey(() => UsersBots)
  @Column({ type: DataType.INTEGER })
  userBotId: number

  @Column({ type: DataType.INTEGER })
  vkGroupId: number

  @Column({ type: DataType.STRING })
  vkAccessKey: string

  @Column({ type: DataType.STRING })
  vkSecret: string

  @Column({ type: DataType.STRING })
  vkConfirm: string

  @BelongsTo(() => UsersBots)
  userBot: UsersBots
}
