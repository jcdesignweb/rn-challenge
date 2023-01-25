import { MigrationInterface, QueryRunner } from 'typeorm'

const WAREHOUSE_TABLE = 'warehouse'

export class AddWarehouseTable1674181866879 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${WAREHOUSE_TABLE} (
                id BIGINT UNSIGNED PRIMARY KEY auto_increment NOT NULL,
                code VARCHAR(20) NOT NULL,
                name VARCHAR(30) NOT NULL,
                address VARCHAR(50) NOT NULL,
                city VARCHAR(50) NOT NULL,
                state VARCHAR(30) NOT NULL,
                country VARCHAR(30) NOT NULL,
                zip INT(8) NOT NULL,
                latlong VARCHAR(50),
                list_file_name VARCHAR(100),
                created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at datetime,
                deleted BOOLEAN NOT NULL DEFAULT 0 
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_general_ci;`
        )

        //await queryRunner.query(`ALTER TABLE ${WAREHOUSE_TABLE} ADD CONSTRAINT constraint_uni_code UNIQUE (code)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ${WAREHOUSE_TABLE}`)
    }
}
