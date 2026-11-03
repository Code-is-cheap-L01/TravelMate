import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddMemberDto,
  CreateActivityDto,
  CreateTripDto,
  ReorderActivitiesDto,
  UpdateActivityStatusDto,
} from './itinerary.dto';
import { ItineraryService } from './itinerary.service';

@ApiTags('Itinerary Collection')
@Controller('trips')
export class ItineraryController {
  constructor(private readonly itinerary: ItineraryService) {}

  @Get()
  @ApiOperation({ summary: 'List collaborative trips' })
  listTrips() {
    return this.itinerary.listTrips();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Trip created' })
  createTrip(@Body() dto: CreateTripDto) {
    return this.itinerary.createTrip(dto);
  }

  @Get(':tripId')
  getTrip(@Param('tripId') tripId: string) {
    return this.itinerary.getTrip(tripId);
  }

  @Post(':tripId/members')
  addMember(@Param('tripId') tripId: string, @Body() dto: AddMemberDto) {
    return this.itinerary.addMember(tripId, dto);
  }

  @Post(':tripId/activities')
  addActivity(@Param('tripId') tripId: string, @Body() dto: CreateActivityDto) {
    return this.itinerary.addActivity(tripId, dto);
  }

  @Patch(':tripId/activities/:activityId/status')
  updateActivityStatus(
    @Param('tripId') tripId: string,
    @Param('activityId') activityId: string,
    @Body() dto: UpdateActivityStatusDto,
  ) {
    return this.itinerary.updateActivityStatus(tripId, activityId, dto);
  }

  @Post(':tripId/activities/reorder')
  reorderActivities(
    @Param('tripId') tripId: string,
    @Body() dto: ReorderActivitiesDto,
  ) {
    return this.itinerary.reorderActivities(tripId, dto);
  }
}
