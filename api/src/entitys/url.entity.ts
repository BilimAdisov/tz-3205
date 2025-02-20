import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { AnalyticsEntity } from './analytics.entity';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  shortUrl: string;

  @Column({ type: 'text' })
  originalUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'int', default: 0 })
  clickCount: number;

  @OneToMany(() => AnalyticsEntity, (analytics) => analytics.url, {
    cascade: true,
  })
  analytics: AnalyticsEntity[];
}
