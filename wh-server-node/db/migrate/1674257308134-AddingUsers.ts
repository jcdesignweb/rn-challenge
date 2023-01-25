import { MigrationInterface, QueryRunner } from 'typeorm'

import users from '../../data/users.json'
import { Md5 } from 'md5-typescript'

export class AddingUsers1674257308134 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const user of users) {
            await queryRunner.query(
                `INSERT INTO user(name, email, password, role)VALUES('${user.name}', '${
                    user.email
                }', '${Md5.init(user.password)}', '${user.role}')`
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE user`)
    }
}
