import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UrlEntity } from 'src/entitys/url.entity';
import { AnalyticsEntity } from 'src/entitys/analytics.entity';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'db'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USER', 'user'),
  password: configService.get<string>('DB_PASSWORD', 'password'),
  database: configService.get<string>('DB_NAME', 'tzdb'),
  entities: [UrlEntity, AnalyticsEntity],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
});
