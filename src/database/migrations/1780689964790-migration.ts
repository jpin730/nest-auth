import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1780689964790 implements MigrationInterface {
  name = 'Migration1780689964790'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tenants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" uuid,
                "updated_at" TIMESTAMP WITH TIME ZONE,
                "updated_by" uuid,
                "name" character varying(255) NOT NULL,
                CONSTRAINT "UQ_32731f181236a46182a38c992a8" UNIQUE ("name"),
                CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'editor', 'viewer')
        `)
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" uuid,
                "updated_at" TIMESTAMP WITH TIME ZONE,
                "updated_by" uuid,
                "tenant_id" uuid NOT NULL,
                "email" character varying(255) NOT NULL,
                "password_hash" character varying(60) NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'viewer',
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_e9f4c2efab52114c4e99e28efb" ON "users" ("email", "tenant_id")
        `)
    await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" uuid,
                "updated_at" TIMESTAMP WITH TIME ZONE,
                "updated_by" uuid,
                "token_hash" character varying(64) NOT NULL,
                "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_a7838d2ba25be1342091b6695f" ON "refresh_tokens" ("token_hash")
        `)
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "refresh_tokens"
            ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"
        `)
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_109638590074998bb72a2f2cf08"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a7838d2ba25be1342091b6695f"
        `)
    await queryRunner.query(`
            DROP TABLE "refresh_tokens"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_e9f4c2efab52114c4e99e28efb"
        `)
    await queryRunner.query(`
            DROP TABLE "users"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "tenants"
        `)
  }
}
