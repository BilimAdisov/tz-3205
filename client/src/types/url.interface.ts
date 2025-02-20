export interface IPostUrl {
  originalUrl: string;
  expiresAt?: string | null;
  alias: string;
}

export interface IGetUrl {
  totalCount: number;
  content: IPostUrl;
}

export interface IAnalytics {
  id: number;
  ipAddress: string;
  createdAt: Date;
}

export interface IUrlInfo {
  id: number;
  shortUrl: string;
  originalUrl: string;
  expiresAt: Date;
  createdAt: Date;
  clickCount: number;
  analytics: IAnalytics[];
}
