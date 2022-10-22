import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'bots', timestamps: false })
export class Bots extends Model {
  @Column({ type: DataType.STRING })
  type: string

  @Column({ type: DataType.STRING })
  name: string

  @Column({ type: DataType.STRING })
  description: string

  @Column({ type: DataType.STRING })
  events: string

  @Column({ type: DataType.FLOAT })
  price: number
}
