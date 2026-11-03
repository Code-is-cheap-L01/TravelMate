import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  AddMemberDto,
  CreateActivityDto,
  CreateTripDto,
  ReorderActivitiesDto,
  UpdateActivityStatusDto,
} from './itinerary.dto';

export interface Member {
  id: string;
  name: string;
}

export interface Activity extends CreateActivityDto {
  id: string;
  status: 'planned' | 'in_progress' | 'completed';
  order: number;
}

export interface Trip {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  members: Member[];
  activities: Activity[];
  createdAt: string;
}

@Injectable()
export class ItineraryService {
  private readonly trips = new Map<string, Trip>();

  listTrips(): Trip[] {
    return [...this.trips.values()];
  }

  createTrip(dto: CreateTripDto): Trip {
    if (new Date(dto.endAt) <= new Date(dto.startAt)) {
      throw new BadRequestException('endAt must be later than startAt');
    }
    const trip: Trip = {
      id: randomUUID(),
      ...dto,
      members: [],
      activities: [],
      createdAt: new Date().toISOString(),
    };
    this.trips.set(trip.id, trip);
    return trip;
  }

  getTrip(tripId: string): Trip {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException(`Trip ${tripId} was not found`);
    return trip;
  }

  addMember(tripId: string, dto: AddMemberDto): Member {
    const trip = this.getTrip(tripId);
    const member = { id: randomUUID(), name: dto.name };
    trip.members.push(member);
    return member;
  }

  addActivity(tripId: string, dto: CreateActivityDto): Activity {
    const trip = this.getTrip(tripId);
    const activity: Activity = {
      id: randomUUID(),
      ...dto,
      order: dto.order ?? trip.activities.length,
      status: 'planned',
    };
    trip.activities.push(activity);
    this.sortActivities(trip);
    return activity;
  }

  updateActivityStatus(
    tripId: string,
    activityId: string,
    dto: UpdateActivityStatusDto,
  ): Activity {
    const activity = this.getActivity(tripId, activityId);
    activity.status = dto.status;
    return activity;
  }

  reorderActivities(tripId: string, dto: ReorderActivitiesDto): Activity[] {
    const trip = this.getTrip(tripId);
    if (
      dto.activityIds.length !== trip.activities.length ||
      new Set(dto.activityIds).size !== trip.activities.length ||
      dto.activityIds.some((id) => !trip.activities.some((activity) => activity.id === id))
    ) {
      throw new BadRequestException(
        'activityIds must contain every activity exactly once',
      );
    }
    const byId = new Map(trip.activities.map((activity) => [activity.id, activity]));
    trip.activities = dto.activityIds.map((id, order) => {
      const activity = byId.get(id)!;
      activity.order = order;
      return activity;
    });
    return trip.activities;
  }

  private getActivity(tripId: string, activityId: string): Activity {
    const trip = this.getTrip(tripId);
    const activity = trip.activities.find((item) => item.id === activityId);
    if (!activity) {
      throw new NotFoundException(`Activity ${activityId} was not found`);
    }
    return activity;
  }

  private sortActivities(trip: Trip): void {
    trip.activities.sort((a, b) => a.order - b.order);
  }
}
