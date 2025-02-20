import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from 'src/entitys/url.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity) private urlRepo: Repository<UrlEntity>,
  ) {}

  async createShortUrl(originalUrl: string, alias?: string, expiresAt?: Date) {
    if (alias) {
      const existingUrl = alias
        ? await this.urlRepo.findOne({ where: { shortUrl: alias } })
        : null;

      if (existingUrl) {
        alias = `${alias}-${uuidv4()}`;
      }
    }
    const shortUrl = alias || uuidv4();
    const newUrl = this.urlRepo.create({ originalUrl, shortUrl, expiresAt });
    return await this.urlRepo.save(newUrl);
  }

  async getOriginalUrl(shortUrl: string) {
    const url = await this.urlRepo.findOne({ where: { shortUrl } });
    if (!url) throw new NotFoundException('url not found');
    url.clickCount++;
    await this.urlRepo.save(url);
    return url.originalUrl;
  }

  async getUrlInfo(shortUrl: string) {
    const url = await this.urlRepo
      .createQueryBuilder('url')
      .leftJoinAndSelect('url.analytics', 'analytics')
      .where('url.shortUrl = :shortUrl', { shortUrl })
      .orderBy('analytics.createdAt', 'DESC')
      .limit(5)
      .getOne();

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url;
  }

  async getAllUrl(page: number, size: number) {
    const offset = (page - 1) * size;
    const urls = await this.urlRepo.find({
      skip: offset,
      take: size,
      select: {
        originalUrl: true,
        expiresAt: true,
        shortUrl: true,
      },
    });

    const totalCount = await this.urlRepo.count();

    return {
      content: urls,
      totalCount: totalCount,
    };
  }

  async deleteUrl(shortUrl: string) {
    const url = await this.urlRepo.findOne({ where: { shortUrl } });
    if (!url) throw new NotFoundException('url not found');
    return await this.urlRepo.remove(url);
  }
}
