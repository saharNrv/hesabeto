"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/Home.module.css";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa6";
import Link from "next/link";
import Box from "@/components/module/box/Box";
import Navbar from "@/components/module/navbar/Navbar";
import ProtectedLayout from "@/components/protectedLayout/ProtectedLayout";
import { apiGetAccount } from "../../api/account";
import { apiGetAllExpenses } from "../../api/expenses";
import { categoryName, getDate } from "../../lib/string";
import { getAllPrice } from "../../lib/number";
import { AccountDTO, initialAccount } from "../../types/account.dto";
import { BaseResponse } from "../../types";
import ExpensesDTO from "../../types/expenses.dto";

export default function Page(): React.JSX.Element {
  const [accountData, setAccountData] = useState<AccountDTO>(initialAccount);
  const [allExpenses, setAllExpenses] = useState<ExpensesDTO[]>([]);

  useEffect(() => {
    apiGetAccount().then((res: BaseResponse<AccountDTO>) => {
      if (res.result !== null) {
        setAccountData(res.result);
      }
    });

    apiGetAllExpenses().then((res: BaseResponse<ExpensesDTO[]>) => {
      if (res.result !== null) {
        setAllExpenses(res.result);
      }
    });
  }, []);

  return (
    <ProtectedLayout>
      <Navbar />
      <div className={style.homeWrapper}>
        {/* home navbar */}
        <div className={style.homeNav}>
          {/* home navbar right */}
          <div className={style.homeNavRight}>
            <div className={style.homeNavIconWrap}>
              <FaUser className={style.homeNavIcon} />
            </div>
            <div className={style.homeNavInfo}>
              <p className={style.homeNavName}>
                {accountData && accountData.full_name !== ""
                  ? accountData.full_name
                  : "نام کاربری"}
              </p>
              <p className={style.homeNavPhone}>
                {accountData && accountData.user_name}
              </p>
            </div>
          </div>
          {/* home navbar left */}
          <div className={style.homeNavLeft}>
            <div className={style.homeNavLeftIconWrap}>
              <Link href={"/charts"}>
                <FaChartPie />
              </Link>
              <Link href={"/settings"}>
                <IoSettings />
              </Link>
            </div>
          </div>
        </div>
        {/* home navbar price */}
        <div className={style.homeNavPricce}>
          <h1>
            {allExpenses.length > 0
              ? getAllPrice(allExpenses).toLocaleString()
              : 0}{" "}
            تومان
          </h1>
        </div>
      </div>
      {/* recent expenses */}
      <div className={style.recentExpenses}>
        <h3>مخارج اخیر</h3>
        <Link href={"/show-all-carts"}>مشاهده همه</Link>
      </div>
      <div className={style.homeBox}>
        {allExpenses.length > 0 &&
          allExpenses.map(
            (exp: ExpensesDTO, index: number): React.JSX.Element => (
              <>
                {index < 5 && (
                  <Box
                    category={categoryName(exp.category)}
                    day={exp.day}
                    month={exp.month}
                    year={exp.year}
                    price={exp.amount.toLocaleString()}
                    boxID={exp.ID}
                    imgSrc={exp.bank_slug}
                  />
                )}
              </>
            )
          )}
      </div>
    </ProtectedLayout>
  );
}
