import { AxiosBaseRequest } from ".";
import { BaseResponse } from "../types";
import ExpensesDTO, { ExpensesInputDTO } from "../types/expenses.dto";
const baseURL: string = "/expenses";

export const apiGetAllExpenses = async (): Promise<
  BaseResponse<ExpensesDTO[]>
> => {
  const response = await AxiosBaseRequest().get(`${baseURL}/get_all`);

  return response.data;
};
export const apiGetByIdBankExpenses = async (
  bankID: string
): Promise<BaseResponse<ExpensesDTO[]>> => {
  const response = await AxiosBaseRequest().get(
    `${baseURL}/by_bank_id/${bankID}`
  );

  return response.data;
};

export const apiGetMonthExpenses = async (
  year: number,
  month: number
): Promise<BaseResponse<ExpensesDTO[]>> => {
  const response = await AxiosBaseRequest().get(
    `${baseURL}/get_in_month/${year}/${month}`
  );

  return response.data;
};

export const apiDeleteExpenses = async (
  bankID: string
): Promise<BaseResponse<number>> => {
  const response = await AxiosBaseRequest().delete(`${baseURL}/${bankID}`);

  return response.data;
};

export const apiGetExpensesID = async (
  bankID: string
): Promise<BaseResponse<ExpensesDTO>> => {
  const response = await AxiosBaseRequest().get(`${baseURL}/${bankID}`);

  return response.data;
};

export const apiPostExpenses = async (input:ExpensesInputDTO):Promise<BaseResponse<ExpensesDTO>> => {
  const response = await AxiosBaseRequest().post(`${baseURL}/create`, input)

  return response.data

}

export const apiPeriodTime = async (_:number, startYear:number, __ :number, endYear:number):Promise<BaseResponse<ExpensesDTO[]>> => {

  const response = await AxiosBaseRequest().get(`${baseURL}/get_period_time?fromYear=${startYear}&fromMonth=${1}&toYear=${endYear}&toMonth=${12}`)

  return response.data

}