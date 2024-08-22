import { BankDTO, BankResponsDTO } from "./bank.dto";

export interface AccountDTO { 
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    currency_type: "IRT" | "USD";
    email: string;
    full_name: string;
    mobile: string;
    password: string;
    user_name: string;
    bank_account: Array<BankDTO> | Array<BankResponsDTO>
}


export const initialAccount : AccountDTO ={
    ID: 0,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    currency_type: "IRT",
    email: "",
    full_name: "",
    mobile: "",
    password: "",
    user_name: "",
    bank_account: []
}


export type ChangePasswordDTO ={
    new_password: string;
    retry_password: string;
}

export type ChangeNameDTO ={
    full_name:string;
}

export type LoginInputDTO={
    password:string;
    user_name:string;
}