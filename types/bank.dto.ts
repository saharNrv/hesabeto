export interface BankDTO {
  account_id: number;
  bank_number: number;
  bank_slug: string;
  name: string;
}


export const initialBankDto: BankDTO = {
  account_id: 0,
  bank_number: 0,
  bank_slug: "",
  name: "",

}

export type BankInfoDTO = {
  name: string;
  bank_slug: string;
};

export type BankResponsDTO = BankDTO & {
  ID: number;
  created_at: Date;
  updated_at: Date;
};

export const initialBankResponse: BankResponsDTO = {
  account_id:0,
  bank_number:0,
  bank_slug:"",
  name:"",
  ID:0,
  created_at:new Date(),
  updated_at:new Date()

}

export type BankInput = {
  bank_number: number;
  bank_slug: string;
  name: string;
}


