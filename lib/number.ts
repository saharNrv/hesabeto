import ExpensesDTO from "../types/expenses.dto";

export const getAllPrice = (expenses: ExpensesDTO[]): number => {
  let prices: number = 0;

  expenses.forEach((item: ExpensesDTO): void => {
    prices += item.amount;
  });

  return prices;
};
