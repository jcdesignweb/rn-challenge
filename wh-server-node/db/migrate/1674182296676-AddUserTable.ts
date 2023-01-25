import { MigrationInterface, QueryRunner } from 'typeorm'

const USER_TABLE = 'user'

export class AddUserTable1674182296676 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${USER_TABLE} (
                id BIGINT UNSIGNED PRIMARY KEY auto_increment NOT NULL,
                name VARCHAR(30) NOT NULL,
                email VARCHAR(70) NOT NULL,
                password VARCHAR(60) NOT NULL,
                role VARCHAR(25) NOT NULL,
                token VARCHAR(255),
                deleted BOOLEAN NOT NULL DEFAULT 0,
                created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at datetime
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_general_ci;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ${USER_TABLE}`)
    }
}
