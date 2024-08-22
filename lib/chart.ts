import ExpensesDTO from "../types/expenses.dto";
import { getMonthlyName } from "./date";

interface chartDTO {
  key: string;
  amount: number;
}

export function setChartArrayMonthly(exp: ExpensesDTO[]): chartDTO[] {
  let charts: chartDTO[] = [];

  exp.forEach((element) => {
    // Create a key in the format "day-month-year"
    let key = `${element.day}-${getMonthlyName(element.month)}-${element.year}`;

    // Check if the key already exists in the charts array
    let existingChart = charts.find((chart) => chart.key === key);

    if (existingChart) {
      // If it exists, sum the amount
      existingChart.amount += element.amount;
    } else {
      // If it doesn't exist, create a new chartDTO and add it to the array
      charts.push({ key: key, amount: element.amount });
    }
  });

  // Sort the charts array by day, month, and year in ascending order
  charts.sort((a, b) => {
    const [dayA, monthA, yearA] = a.key.split("-").map(Number);
    const [dayB, monthB, yearB] = b.key.split("-").map(Number);

    if (yearA !== yearB) {
      return yearA - yearB;
    } else if (monthA !== monthB) {
      return monthA - monthB;
    } else {
      return dayA - dayB;
    }
  });

  return charts;
}

export function changeNumberStyle(number: number): string {
  if (number >= 1_000_000) {
    return `${number / 1_000_000}M ت`;
  }

  if (number >= 1_000_000_000) {
    return `${number / 1_000_000_000}B ت`;
  }

  return `${number} ت`;
}
