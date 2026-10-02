import { Migration } from '@mikro-orm/migrations';

export class Migration20261002091521 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table \`users\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`created_at\` datetime not null);`);

    this.addSql(`create table \`expenses\` (\`id\` integer not null primary key autoincrement, \`payer_id\` integer not null, \`payee_id\` integer not null, \`amount\` integer not null, \`description\` text not null, \`occurred_at\` datetime not null, \`created_at\` datetime not null, constraint \`expenses_payer_id_foreign\` foreign key (\`payer_id\`) references \`users\` (\`id\`), constraint \`expenses_payee_id_foreign\` foreign key (\`payee_id\`) references \`users\` (\`id\`));`);
    this.addSql(`create index \`expenses_payer_id_index\` on \`expenses\` (\`payer_id\`);`);
    this.addSql(`create index \`expenses_payee_id_index\` on \`expenses\` (\`payee_id\`);`);
  }

  override down(): void | Promise<void> {

    this.addSql(`drop table if exists \`users\`;`);
    this.addSql(`drop table if exists \`expenses\`;`);
  }

}
