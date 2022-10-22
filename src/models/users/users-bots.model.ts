import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'

import { User } from './users.model'
import { Bots } from '../bots/bots.model'
import { BotSettings } from '../bots/bots-settings.model'

@Table({ tableName: 'users_bots' })
export class UsersBots extends Model<UsersBots> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Bots)
  @Column({ type: DataType.INTEGER })
  botId: number

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  run: string

  @Column({ type: DataType.DATE })
  lastPayed: string

  @BelongsTo(() => User)
  owner: User

  @BelongsTo(() => Bots)
  bot: Bots

  @HasOne(() => BotSettings)
  settings: BotSettings

  /*@BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasOne(() => Balance)
  balance: Balance[]

  @HasMany(() => Token)
  tokens: Token[]

  @HasMany(() => Social)
  socials: Social[]*/
}
