import { AxiosBaseRequest } from ".";
import { BaseResponse } from "../types";
import { AccountDTO, ChangeNameDTO, ChangePasswordDTO, LoginInputDTO } from "../types/account.dto";
import { TokenBandlerDTO } from "../types/tokenbandler.dto";

const baseURL: string = "/account";

export const apiGetAccount = async (): Promise<BaseResponse<AccountDTO>> => {
  const response = await AxiosBaseRequest().get(baseURL);

  return response.data;
};

export const apiChangePassword = async (
  input: ChangePasswordDTO
): Promise<BaseResponse<string>> => {
  const response = await AxiosBaseRequest().patch(
    `${baseURL}/change_password`,
    input
  );

  return response.data;
};

export const apiChangeName = async (input:ChangeNameDTO):Promise<BaseResponse<AccountDTO>> => {
  const response = await AxiosBaseRequest().patch(
    `${baseURL}/change_name`,
    input
  );

  return response.data;
};

export const apiSignIn = async (input:LoginInputDTO):Promise<BaseResponse<TokenBandlerDTO>> => {
  const response = await AxiosBaseRequest().post(`${baseURL}/signin`, input)

  return response.data
}
export const apiSignUp = async (input:LoginInputDTO):Promise<BaseResponse<TokenBandlerDTO>> => {
  const response = await AxiosBaseRequest().post(`${baseURL}/signup`, input)

  return response.data
}