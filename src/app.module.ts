import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary/itinerary.controller';
import { ItineraryService } from './itinerary/itinerary.service';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseService } from './expense/expense.service';

@Module({
  controllers: [ItineraryController, ExpenseController],
  providers: [ItineraryService, ExpenseService],
})
export class AppModule {}
