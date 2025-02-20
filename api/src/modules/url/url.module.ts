import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { AnalyticsModule } from '../analytics/analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entitys/url.entity';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [AnalyticsModule, TypeOrmModule.forFeature([UrlEntity])],
})
export class UrlModule {}
