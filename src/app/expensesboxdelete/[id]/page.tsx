"use client";
import Topbar from "@/components/module/topbar/Topbar";
import React, { useEffect, useState } from "react";
import style from "@/styles/Expensesboxdelete.module.css";
import { FaBoxOpen, FaBrush } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/module/modal/Modal";
import Navbar from "@/components/module/navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import { apiDeleteExpenses, apiGetExpensesID } from "../../../../api/expenses";
import { categoryName } from "../../../../lib/string";
import Image from "next/image";
import ExpensesDTO, { initialExpense } from "../../../../types/expenses.dto";

export default function Expensesboxdelete() {
  const { id } = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boxInfo, setBoxInfo] = useState<ExpensesDTO>(initialExpense);

  const showModalHandler = (): void => {
    setShowModal(true);
  };
  const closeModalHandler = (): void => {
    setShowModal(false);
  };

  const deleteExpensesHandler = () => {
    apiDeleteExpenses(id as string).then((res) => {
      if (res.result !== null) {
        router.replace("/show-all-carts");
      }
    });
  };

  useEffect(() => {
    apiGetExpensesID(id as string).then((res) => {
      console.log(res);
      if (res.result !== null) {
        setBoxInfo(res.result);
      }
    });

    console.log("ibnfo", boxInfo);
  }, []);

  return (
    <>
      <Navbar />
      <Topbar
        title={
          boxInfo.year &&
          boxInfo.day &&
          boxInfo.month &&
          `${boxInfo.year}/${boxInfo.month}/${boxInfo.day}`
        }
        showBtn={true}
        linkBtnUrl={"/show-all-carts"}
      />
      <div className={style.expensesboxdelete}>
        <div className={style.expensesboxdeleteInfon}>
          <p className={style.expensesboxdeleteTitle}>مبلغ</p>
          <p className={style.ExpensesboxdeletePrice}>
            {boxInfo.amount ?? 0} تومان
          </p>
        </div>
        <div className={style.expensesboxdeleteInfon}>
          <p className={style.expensesboxdeleteTitle}>دسته بندی</p>
          <p className={style.expensesboxdeleteGroup}>
            <span>
              {boxInfo.category ? categoryName(boxInfo.category) : "دسته بندی "}
            </span>
            <FaBoxOpen />
          </p>
        </div>
        <div className={style.expensesboxdeleteInfon}>
          <p className={style.expensesboxdeleteTitle}>کارت</p>
          <p className={style.expensesboxdeleteImgWrap}>
            <span>{boxInfo.bank_name === "" ? "" : boxInfo.bank_name}</span>
            {boxInfo.bank_slug && (
              <Image
                className={style.expensesboxdeleteImg}
                src={`/icon/${boxInfo.bank_slug}.png`}
                width={50}
                height={50}
                alt={boxInfo.bank_slug}
              />
            )}
          </p>
        </div>
      </div>
      <div className={style.expensesboxdeleteBtn}>
        <button onClick={showModalHandler}>
          حذف کارت
          <MdDelete />
        </button>
      </div>

      <Modal
        show={showModal}
        onClose={closeModalHandler}
        title={"ایا از حذف این کارت اطمینان دارید؟"}
      >
        <div className={style.expensesboxdeleteModalBtn}>
          <button
            className={style.expensesboxdeleteModalBtn1}
            onClick={deleteExpensesHandler}
          >
            حذف
          </button>
          <button
            className={style.expensesboxdeleteModalBtn2}
            onClick={() => setShowModal(false)}
          >
            خیر
          </button>
        </div>
      </Modal>
    </>
  );
}
