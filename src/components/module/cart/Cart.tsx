import React from "react";
import style from "./Cart.module.css";
import Link from "next/link";
import Image from "next/image";

type PropsDTO = {
  title: string;
  cartnumber:number;
  cartID: number;
  imgSrc: string;
};

function Cart({ title, cartnumber, cartID, imgSrc }:PropsDTO) {
  return (
    <div className={style.cart}>
      <Link href={`/cartdetails/${cartID}`} className={style.cartWrapper}>
        <div className={style.cartImgWrap}>
          <Image
            className={style.cartImg}
            src={`/icon/${imgSrc}.png`}
            width={50}
            height={50}
            alt={imgSrc}
          />
        </div>
        <div className={style.cartInfo}>
          <h3>{title}</h3>
          <p>{cartnumber}</p>
        </div>
      </Link>
    </div>
  );
}

export default Cart;
