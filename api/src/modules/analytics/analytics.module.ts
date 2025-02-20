import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entitys/url.entity';
import { AnalyticsEntity } from 'src/entitys/analytics.entity';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
  imports: [TypeOrmModule.forFeature([UrlEntity, AnalyticsEntity])],
})
export class AnalyticsModule {}
