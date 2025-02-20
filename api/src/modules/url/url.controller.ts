import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Res,
  HttpCode,
  Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Response, Request } from 'express';
import { CreateUrlDTO } from './DTOs/url.dto';
import { AnalyticsService } from '../analytics/analytics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('shorten')
  async shortenUrl(@Body() body: CreateUrlDTO) {
    return this.urlService.createShortUrl(
      body.originalUrl,
      body.alias,
      body.expiresAt,
    );
  }

  @Get('get/:page/:size')
  async getAllUrl(@Param('page') page: number, @Param('size') size: number) {
    return this.urlService.getAllUrl(page, size);
  }

  @Get('info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getUrlInfo(shortUrl);
  }

  @Delete('delete/:shortUrl')
  @HttpCode(204)
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.urlService.deleteUrl(shortUrl);
  }

  @Get('redirect/:shortUrl')
  async redirect(
    @Param('shortUrl') shortUrl: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    await this.analyticsService.logClick(shortUrl, req.ip);
    return res.redirect(originalUrl);
  }
}
