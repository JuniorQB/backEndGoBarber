import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1587780437855
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

/**
 * Linha do tempo
 * 1 semana: agendamentos
 * 2 semana: Usuarios
 * (novo dev)
 * 3 semana Edicao Agendamentos
 * 4 semana: compras
 * Migrations controlam versoes do banco de dados e alterações do banco, criando um codigo
 * de migrations para que um time de desenvolvedores estejam trabalhando na mesma versao
 * e alteraçoes iguais
 */
