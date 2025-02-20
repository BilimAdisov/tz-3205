import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UrlEntity } from './url.entity';

@Entity('analytics')
export class AnalyticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UrlEntity, (url) => url.analytics, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  url: UrlEntity;

  @Column()
  ipAddress: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
