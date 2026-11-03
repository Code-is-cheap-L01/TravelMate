import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateExpenseDto } from './expense.dto';
import { ItineraryService } from '../itinerary/itinerary.service';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  payerId: string;
  participantIds: string[];
  activityId?: string;
  createdAt: string;
}

export interface Balance {
  memberId: string;
  memberName: string;
  amount: number;
}

export interface Settlement {
  fromMemberId: string;
  fromMemberName: string;
  toMemberId: string;
  toMemberName: string;
  amount: number;
}

@Injectable()
export class ExpenseService {
  private readonly expenses = new Map<string, Expense[]>();

  constructor(private readonly itinerary: ItineraryService) {}

  listExpenses(tripId: string): Expense[] {
    this.itinerary.getTrip(tripId);
    return this.expenses.get(tripId) ?? [];
  }

  createExpense(tripId: string, dto: CreateExpenseDto): Expense {
    const trip = this.itinerary.getTrip(tripId);
    const memberIds = new Set(trip.members.map((member) => member.id));
    const participantIds = new Set(dto.participantIds);
    if (
      !memberIds.has(dto.payerId) ||
      participantIds.size === 0 ||
      [...participantIds].some((id) => !memberIds.has(id))
    ) {
      throw new BadRequestException(
        'payerId and participantIds must reference members of this trip',
      );
    }

    if (dto.activityId && !trip.activities.some((activity) => activity.id === dto.activityId)) {
      throw new BadRequestException('activityId must reference an activity in this trip');
    }

    const expense: Expense = {
      id: randomUUID(),
      ...dto,
      participantIds: [...participantIds],
      createdAt: new Date().toISOString(),
    };
    const tripExpenses = this.expenses.get(tripId) ?? [];
    tripExpenses.push(expense);
    this.expenses.set(tripId, tripExpenses);
    return expense;
  }

  getSettlement(tripId: string, precision = 2): {
    balances: Balance[];
    settlements: Settlement[];
  } {
    const trip = this.itinerary.getTrip(tripId);
    if (!Number.isInteger(precision) || precision < 0 || precision > 4) {
      throw new BadRequestException('precision must be an integer from 0 to 4');
    }
    const balances = new Map(trip.members.map((member) => [member.id, 0]));
    for (const expense of this.listExpenses(tripId)) {
      const share = expense.amount / expense.participantIds.length;
      balances.set(expense.payerId, balances.get(expense.payerId)! + expense.amount);
      for (const participantId of expense.participantIds) {
        balances.set(participantId, balances.get(participantId)! - share);
      }
    }

    const roundedBalances = trip.members.map((member) => ({
      memberId: member.id,
      memberName: member.name,
      amount: Number(balances.get(member.id)!.toFixed(precision)),
    }));
    const creditors = roundedBalances
      .filter((balance) => balance.amount > 0)
      .sort((a, b) => b.amount - a.amount);
    const debtors = roundedBalances
      .filter((balance) => balance.amount < 0)
      .map((balance) => ({ ...balance, amount: -balance.amount }))
      .sort((a, b) => b.amount - a.amount);
    const settlements: Settlement[] = [];
    let creditorIndex = 0;
    let debtorIndex = 0;
    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];
      const amount = Number(Math.min(creditor.amount, debtor.amount).toFixed(precision));
      if (amount > 0) {
        settlements.push({
          fromMemberId: debtor.memberId,
          fromMemberName: debtor.memberName,
          toMemberId: creditor.memberId,
          toMemberName: creditor.memberName,
          amount,
        });
      }
      creditor.amount = Number((creditor.amount - amount).toFixed(precision));
      debtor.amount = Number((debtor.amount - amount).toFixed(precision));
      if (creditor.amount === 0) creditorIndex++;
      if (debtor.amount === 0) debtorIndex++;
    }
    return { balances: roundedBalances, settlements };
  }
}
