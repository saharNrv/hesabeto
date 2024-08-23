"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/Addnewcart.module.css";
import Topbar from "@/components/module/topbar/Topbar";
import Input from "@/components/module/inputwrap/Input";
import Navbar from "@/components/module/navbar/Navbar";
import Modal from "@/components/module/modal/Modal";
import { apiGetAllBank, apiPostBank } from "../../../api/bank";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { replaceFaNum2EnNum } from "../../../lib/string";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  BankDTO,
  BankInfoDTO,
  BankInput,
  BankResponsDTO,
} from "../../../types/bank.dto";
import { BaseResponse } from "../../../types";
export default function AddNewCart(): React.JSX.Element {
  const router: AppRouterInstance = useRouter();

  const [bank, setBank] = useState<BankInfoDTO>({
    name: "",
    bank_slug: "",
  });
  const [cartNumber, setCartNumber] = useState<string>("");
  const [cartName, setCartName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allBanks, setAllBanks] = useState<BankInfoDTO[]>([]);
  const [cartBoxNumber, setCartBoxNumber] = useState<string>("");

  // choice bank handler func
  const choiceBank = (event: any) => {
    event.preventDefault();
    setShowModal(true);
  };
  // close modal handler
  const closeModal = (): void => {
    setShowModal(false);
  };

  useEffect((): void => {
    apiGetAllBank().then((res: BaseResponse<BankInfoDTO[]>) => {
      if (res.result !== null) {
        setAllBanks(res.result);
      }
    });
  }, []);

  // select bank_slug
  const selectBank = (bankInfo: BankInfoDTO) => {
    setBank(bankInfo);
    setShowModal(false);
  };

  // submit handler
  const submitHandler = (event: any) => {
    event.preventDefault();

    const newCart: BankInput = {
      bank_number: Number(replaceFaNum2EnNum(cartNumber)),
      bank_slug: bank.bank_slug,
      name: cartName,
    };

    apiPostBank(newCart).then((res: BaseResponse<BankResponsDTO>): void => {
      if (res.result !== null) {
        router.replace("/carts");
      }
    });
  };

  return (
    <>
      <Navbar />
      {/* topbar component */}
      <Topbar title={"ایجاد کارت جدید"} />

      <div className={style.cartBoxWrapper}>
        <div className={style.cartBoxContact}>
          <div className={style.cartBoxImgWrap}>
            <p>بانک دی</p>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div>
            <p className={style.cartBoxNumber}>{cartBoxNumber}</p>
          </div>
          <div>
            <p className={style.cartBoxDate}>
                exp:*/*
            </p>
          </div>
        </div>
      </div>

      <div className={style.addnewcart}>
        {/* <div className={style.formWrapper}> */}
        <form className={style.form}>
          <div className={style.addnewcartBtnWrap}>
            <h4 className={style.addnewcartBtnTitle}>بانک</h4>
            <button className={style.addnewcartBtn} onClick={choiceBank}>
              {bank.name === "" ? "بانک خود را انتخاب کنید" : bank.name}
            </button>
          </div>
          <Input
            title={"شماره کارت"}
            placeholder={"شماره کارت را وارد کنید"}
            value={cartNumber}
            onChange={(value) => setCartNumber(value)}
            type={"text"}
          />
          <Input
            title={"نام"}
            placeholder={"نام کارت را وارد کنید"}
            value={cartName}
            onChange={(value) => setCartName(value)}
            type={"text"}
          />

          <div className={style.formBtn}>
            <button onClick={submitHandler}>تایید</button>
          </div>
        </form>
        {/* </div> */}
      </div>

      {/* modal */}
      <Modal
        title={"بانک خود را انتخاب کنید"}
        show={showModal}
        onClose={closeModal}
      >
        <div className={style.gridContainer}>
          {allBanks.length > 0 &&
            allBanks.map((bank, index) => (
              <button
                key={index}
                onClick={() =>
                  selectBank({
                    name: bank.name,
                    bank_slug: bank.bank_slug,
                  })
                }
              >
                <span>{bank.name}</span>

                <Image
                  src={`/icon/${bank.bank_slug}.png`}
                  width={30}
                  height={30}
                  alt={bank.bank_slug}
                />
              </button>
            ))}
        </div>
      </Modal>
    </>
  );
}
