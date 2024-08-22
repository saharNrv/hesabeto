export default interface ExpensesDTO {
  ID: number;
  created_at: Date;
  updated_at: Date;
  account_id: number;
  amount: number;
  bank_id: number;
  bank_name: string;
  bank_number: number;
  bank_slug: string;
  category: string;
  day: number;
  hour: number;
  minute: number;
  month: number;
  notes: string;
  year: number;
}

export const initialExpense: ExpensesDTO = {
  ID: 0,
  created_at: new Date(),
  updated_at: new Date(),
  account_id: 0,
  amount: 0,
  bank_id: 0,
  bank_name: "",
  bank_number: 0,
  bank_slug: "string",
  category: "string",
  day: 0,
  hour: 0,
  minute: 0,
  month: 0,
  notes: "",
  year: 0,
};

export type ExpensesInputDTO = {
  amount: number;
  bank_id: number;
  bank_name: string;
  bank_number: number;
  bank_slug: string;
  category: string;
  date:DateDTO;
  note: string;
};

export type DateDTO = {
  day: number;
  hour: number;
  minute: number;
  month: number;
  year: number;
};

export type MonthlyDTO = {
  month: number;
  year: number;
}

export type RangeDTO = {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
}