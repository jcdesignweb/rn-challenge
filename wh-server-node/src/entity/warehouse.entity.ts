import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    CreateDateColumn,
    Unique
} from 'typeorm'

@Entity()
export default class Warehouse extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string

    @Column()
    zip: string

    @Column()
    latlong: string

    @Column()
    list_file_name: string

    @Column({
        default: false
    })
    deleted: boolean

    @CreateDateColumn({
        type: 'timestamp',
        comment: 'Creation date',
        default: Timestamp
    })
    updated_at: Date

    @CreateDateColumn({
        type: 'timestamp',
        comment: 'Creation date',
        default: Timestamp
    })
    created_at: Date
}
