import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Cơm niêu Thuận Kiều' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 720000, description: 'Amount in VND' })
  @IsInt()
  @IsPositive()
  amount!: number;

  @ApiProperty({ example: 'member-id' })
  @IsUUID()
  payerId!: string;

  @ApiProperty({ type: [String], example: ['member-id-1', 'member-id-2'] })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty({ each: true })
  participantIds!: string[];

  @ApiPropertyOptional({ example: 'activity-id' })
  @IsOptional()
  @IsUUID()
  activityId?: string;
}

export class SettlementQueryDto {
  @ApiPropertyOptional({ example: 2, default: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  precision?: number;
}
