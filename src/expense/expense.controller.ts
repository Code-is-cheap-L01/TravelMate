import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExpenseDto, SettlementQueryDto } from './expense.dto';
import { ExpenseService } from './expense.service';

@ApiTags('Expense & Settlement Collection')
@Controller('trips/:tripId')
export class ExpenseController {
  constructor(private readonly expenses: ExpenseService) {}

  @Get('expenses')
  @ApiOperation({ summary: 'List expenses for a trip' })
  listExpenses(@Param('tripId') tripId: string) {
    return this.expenses.listExpenses(tripId);
  }

  @Post('expenses')
  @ApiCreatedResponse({ description: 'Contextual expense recorded' })
  createExpense(@Param('tripId') tripId: string, @Body() dto: CreateExpenseDto) {
    return this.expenses.createExpense(tripId, dto);
  }

  @Get('settlement')
  @ApiOperation({ summary: 'Calculate net balances and minimal transfers' })
  getSettlement(
    @Param('tripId') tripId: string,
    @Query() query: SettlementQueryDto,
  ) {
    return this.expenses.getSettlement(tripId, query.precision ?? 2);
  }
}
