import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm'

export enum UserRole {
    Manager = 'manager',
    Basic = 'basic'
}

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({
        select: false
    })
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Manager
    })
    role: UserRole

    @Column({
        type: 'text'
    })
    token: string

    @Column({
        default: false
    })
    deleted: boolean

    @UpdateDateColumn({
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
