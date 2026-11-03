import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Đà Lạt cuối tuần' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '2026-12-12T08:00:00.000Z' })
  @IsDateString()
  startAt!: string;

  @ApiProperty({ example: '2026-12-14T18:00:00.000Z' })
  @IsDateString()
  endAt!: string;
}

export class AddMemberDto {
  @ApiProperty({ example: 'Minh' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateActivityDto {
  @ApiProperty({ example: 'Cà phê sáng' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: '2026-12-12T09:00:00.000Z' })
  @IsDateString()
  startsAt!: string;

  @ApiPropertyOptional({ example: 'https://maps.google.com/?q=Da+Lat' })
  @IsOptional()
  @IsUrl()
  mapsUrl?: string;

  @ApiProperty({ example: 11.9404 })
  @IsLatitude()
  latitude!: number;

  @ApiProperty({ example: 108.4583 })
  @IsLongitude()
  longitude!: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  order?: number;
}

export class UpdateActivityStatusDto {
  @ApiProperty({ enum: ['planned', 'in_progress', 'completed'] })
  @IsIn(['planned', 'in_progress', 'completed'])
  status!: 'planned' | 'in_progress' | 'completed';
}

export class ReorderActivitiesDto {
  @ApiProperty({ type: [String], example: ['activity-id-2', 'activity-id-1'] })
  @IsString({ each: true })
  activityIds!: string[];
}
