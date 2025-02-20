import { Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Аналитика')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    const analytic = await this.analyticsService.getAnalytics(shortUrl);
    if (!analytic) {
      throw new NotFoundException('Analityc data not found');
    }
    return analytic;
  }
}
