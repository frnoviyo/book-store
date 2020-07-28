import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: true,
        type: 'postgres' as 'postgres',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrtaions/*.{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
