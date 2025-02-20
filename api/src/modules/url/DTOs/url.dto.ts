import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDTO {
  @ApiProperty({
    example: 'https://3205.team/',
    description: 'Действующий url',
  })
  originalUrl!: string;

  @ApiProperty({
    example: 'alias',
    description: 'Уникальный алиас (опционально)',
    required: false,
  })
  alias?: string;

  @ApiProperty({
    example: '2025-12-31T23:59:59.000Z',
    description: 'Дата истечения ссылки (опционально)',
    required: false,
  })
  expiresAt?: Date;
}
