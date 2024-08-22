import React from "react";
import style from "./Box.module.css";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

type PropsDTO = {
  category: string;
  price: string;
  day: number;
  month: number;
  year: number;
  boxID: number;
  imgSrc: string;
};

function Box({ category, price, day, month, year, boxID, imgSrc }: PropsDTO) {
  return (
    <Link href={`/expensesboxdelete/${boxID}`}>
      <div className={style.boxWrap}>
        <div className={style.boxInfoWrap}>
          <div className={style.boxIconWrap}>
            <FaBoxOpen className={style.boxIcon} />
          </div>
          <div className={style.boxInfo}>
            <div className={style.boxTitleWrap}>
              <p className={style.boxTitle}>{category}</p>
              {imgSrc && (
                <Image
                  className={style.boxImg}
                  src={`/icon/${imgSrc}.png`}
                  width={50}
                  height={50}
                  alt={imgSrc}
                />
              )}
            </div>
            <p className={style.boxDate}>{`${year}/${month}/${day}`}</p>
          </div>
        </div>
        <div className={style.boxPrice}>
          {price}
          <span> تومان</span>{" "}
        </div>
      </div>
    </Link>
  );
}

export default Box;
