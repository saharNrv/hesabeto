import { AxiosBaseRequest } from "."
import { BaseResponse } from "../types"
import { BankDTO, BankInfoDTO, BankInput, BankResponsDTO } from "../types/bank.dto"

const baseURL = "/bank"

export const apiGetAllBank = async ():Promise<BaseResponse<BankInfoDTO[]>> => {

    const response = await AxiosBaseRequest().get(`${baseURL}/all`)

    return response.data
}

export const apiPostBank = async (input:BankInput):Promise<BaseResponse<BankResponsDTO>> =>{

    const response = await AxiosBaseRequest().post(`${baseURL}/create`,input)

    return response.data

}

export const apiGetByIdBank = async (bankID:string):Promise<BaseResponse<BankResponsDTO>> =>{

    const response = await AxiosBaseRequest().get(`${baseURL}/by_id/${bankID}`)

    return response.data
}

export const apiDeleteBank = async (bankID:string):Promise<BaseResponse<number>> =>{

    const response = await AxiosBaseRequest().delete(`${baseURL}/${bankID}`)

    return response.data

}