"use client";

import Topbar from "@/components/module/topbar/Topbar";
import React, { useEffect, useState } from "react";
import style from "@/styles/Cartdetails.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Box from "@/components/module/box/Box";
import Modal from "@/components/module/modal/Modal";
import { Translate } from "../../../../context/CultureProvider";
import { Dictionary } from "../../../../lib/dictionary";
import Navbar from "@/components/module/navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import { apiDeleteBank, apiGetByIdBank } from "../../../../api/bank";
import Image from "next/image";
import {
  apiGetByIdBankExpenses,
  apiGetMonthExpenses,
} from "../../../../api/expenses";
import { categoryName } from "../../../../lib/string";
import { getAllPrice } from "../../../../lib/number";
import { getPersianMonth } from "../../../../lib/date";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  BankDTO,
  BankResponsDTO,
  initialBankResponse,
} from "../../../../types/bank.dto";
import { BaseResponse } from "../../../../types";
import ExpensesDTO from "../../../../types/expenses.dto";

export default function CartDetails() {
  // id is a bank that get from url
  const { id } = useParams();
  const router: AppRouterInstance = useRouter();

  // <--- States --->
  const [showModal, setShowModal] = useState<boolean>(false);

  // info cart is for store bankCart details
  const [infoCart, setInfoCart] = useState<BankResponsDTO>(initialBankResponse);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [expensesBox, setExpensesBox] = useState<ExpensesDTO[]>([]);
  const [monthCurrents, setMonthCurrents] = useState<boolean>(false);

  // <--- Effects --->
  useEffect(() => {
    apiGetByIdBank(id as string).then((res: BaseResponse<BankResponsDTO>) => {
      if (res.result !== null) {
        setInfoCart(res.result);
      }
    });
  }, []);

  useEffect(() => {
    if (!monthCurrents) {
      apiGetByIdBankExpenses(id as string).then(
        (res: BaseResponse<ExpensesDTO[]>) => {
          if (res.result !== null) {
            setExpensesBox(res.result);
          }
        }
      );
    } else {
      apiGetMonthExpenses(getPersianMonth("y"), getPersianMonth("m"))
        // we can dont use type for result when state and result have same types
        .then((res) => {
          // setExpensesBox(res.result)
          if (res.result !== null && res.result.length > 0) {
            const expensesResult = res.result.filter(
              (item) => item.bank_id === +id
            );
            setExpensesBox(expensesResult);
          } else if (res.result !== null && res.result.length === 0) {
            setExpensesBox([]);
          }
        });
    }
  }, [monthCurrents]);

  // <--- Handlers --->
  //  A function that shows a modal.
  const showModalHandler = (): void => {
    setShowModal(true);
  };
  //  A function that close a modal.
  const closeModalHandler = (): void => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  const showDeleteModalHandler = (): void => {
    setShowDeleteModal(true);
  };

  const deleteCartHandler = (bankID: string) => {
    apiDeleteBank(bankID).then((res: BaseResponse<number>) => {
      if (res.result !== null) {
        router.replace("/carts");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className={style.cartDetailsWrapper}>
        {/* tobar component It will get the title props from the data */}
        <Topbar
          title={!!infoCart && infoCart.name !== "" ? infoCart.name : ""}
          showBtn={true}
          linkBtnUrl={"/carts"}
        />

        {/* cart details */}
        <div className={style.cartDetailsInfowrap}>
          <div className={style.cartDetailsImgWrap}>
            {!!infoCart && (
              <Image
                className={style.cartDetailsImg}
                width={50}
                height={50}
                src={`/icon/${infoCart.bank_slug}.png`}
                alt={infoCart.bank_slug}
              />
            )}
          </div>
          <div className={style.cartDetailsInfo}>
            <h3>{Translate(Dictionary.BANKS)}</h3>
            <p>
              {!!infoCart && infoCart.bank_number !== 0
                ? infoCart.bank_number
                : ""}
            </p>
          </div>
        </div>

        {/* Show expenses */}
        <div className={style.showExpenses}>
          <h2 className={style.showExpensesTitle}>نمایش مخارج</h2>
          <div className={style.showExpensesBtnWrap}>
            <button
              className={style.showExpensesBtn1}
              onClick={showModalHandler}
            >
              <span>ماه جاری</span>
              <IoMdArrowDropdown />
            </button>
            <button
              onClick={showDeleteModalHandler}
              className={style.showExpensesBtn2}
            >
              <span>حذف کارت</span>
              <MdDelete />
            </button>
          </div>
        </div>
        {/* show add expenses */}
        <div className={style.showAddExpenses}>
          <p className={style.showAddExpensesTitle}>جمع مخارج</p>
          <p className={style.showAddExpensesPrice}>
            {expensesBox.length > 0 ? getAllPrice(expensesBox) : 0} تومان
          </p>
        </div>
        {/* box */}
        {expensesBox.length === 0
          ? ""
          : expensesBox.map((exp, index) => (
              <Box
                key={index}
                category={categoryName(exp.category)}
                price={`${exp.amount}`}
                day={exp.day}
                month={exp.month}
                year={exp.year}
                boxID={exp.ID}
                imgSrc={exp.bank_slug}
              />
            ))}
        {/* cart details modal */}

        <Modal
          show={showModal}
          onClose={closeModalHandler}
          title={"نمایش مخارج"}
        >
          <div className={style.modalBtnWrap}>
            <button
              className={style.ModalBtn1}
              onClick={(): void => setMonthCurrents(true)}
            >
              ماه جاری
            </button>
            <button
              className={style.ModalBtn2}
              onClick={(): void => setMonthCurrents(false)}
            >
              کل مخارج
            </button>
          </div>
        </Modal>

        {/* modal delete */}
        <Modal
          show={showDeleteModal}
          onClose={closeModalHandler}
          title={"ایا از حذف کارت مطمین هستید؟"}
        >
          <div className={style.detelteBox}>
            <button
              className={style.detelteBox1}
              onClick={(): void => deleteCartHandler(id as string)}
            >
              بله
            </button>
            <button
              className={style.detelteBox2}
              onClick={(): void => setShowDeleteModal(false)}
            >
              خیر
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
