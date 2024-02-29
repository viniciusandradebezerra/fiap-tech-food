import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql.sqlite',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};