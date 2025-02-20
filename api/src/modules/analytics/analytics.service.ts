import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsEntity } from 'src/entitys/analytics.entity';
import { UrlEntity } from 'src/entitys/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEntity)
    private readonly analyticsRepo: Repository<AnalyticsEntity>,
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async logClick(shortUrl: string, ipAddress: string) {
    const url = await this.urlRepo.findOne({
      where: { shortUrl },
    });

    if (!url) throw new NotFoundException('URL not found');

    const entry = new AnalyticsEntity();
    entry.ipAddress = ipAddress;
    entry.url = url;

    url.clickCount + 1;
    await this.urlRepo.save(url);
    await this.analyticsRepo.save(entry);
  }

  async getAnalytics(shortUrl: string) {
    const url = await this.analyticsRepo.find({});

    return url;
  }
}
