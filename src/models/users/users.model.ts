import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { UsersBots } from './users-bots.model'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.STRING, unique: true })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean

  @Column({ type: DataType.STRING })
  activationLink: string

  @HasMany(() => UsersBots)
  userBots: UsersBots[]

  /*@BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasOne(() => Balance)
  balance: Balance[]

  @HasMany(() => Token)
  tokens: Token[]

  @HasMany(() => Social)
  socials: Social[]*/
}
