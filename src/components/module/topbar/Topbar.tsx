"use client";
import React from "react";
import style from "./Topbar.module.css";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

type PropsDTO = {
  title: string | number;
  showBtn?: boolean;
  linkBtnUrl? : string;
};

export default function Topbar({ title, showBtn, linkBtnUrl }: PropsDTO) {
  const router = useRouter();

  return (
    <div className={style.topbar}>
      <h1>{title}</h1>
      {/* back button */}
      {showBtn ? (
        <div className={style.backBtn}>
          <button className={style.btnBack} onClick={() => router.back()}>
            <FaArrowRight />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
