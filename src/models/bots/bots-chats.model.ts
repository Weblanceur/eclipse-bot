import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Bots } from './bots.model'

@Table({ tableName: 'bots_chats' })
export class BotChats extends Model {
  @ForeignKey(() => Bots)
  @Column({ type: DataType.INTEGER })
  botId: number

  @Column({ type: DataType.INTEGER })
  peerId: number

  @Column({ type: DataType.INTEGER })
  messageTimeout: number

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  useBlacklist: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  kickBots: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  clearChat: boolean

  @Column({ type: DataType.STRING(16) })
  target: string

  @Column({ type: DataType.INTEGER })
  targetCount: number

  @Column({ type: DataType.STRING })
  warnings: string

  @Column({ type: DataType.JSONB })
  admins: string

  @Column({ type: DataType.JSONB })
  vipList: string

  @Column({ type: DataType.JSONB })
  accountPeers: string

  @Column({ type: DataType.JSONB })
  links: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  complete: boolean
}
