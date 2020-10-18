import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class images1602640012809 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'orphanage_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'image_orphanages',
          columnNames: ['orphanage_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orphanages',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
