"use client"
import Topbar from '@/components/module/topbar/Topbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from '@/styles/Carts.module.css'
import { FaPlus } from "react-icons/fa6";
import Cart from '@/components/module/cart/Cart';
import { Translate } from '../../../context/CultureProvider';
import { Dictionary } from '../../../lib/dictionary';
import Navbar from '@/components/module/navbar/Navbar';
import { apiGetAccount } from '../../../api/account';
import { apiGetAllBank } from '../../../api/bank';
import { AccountDTO } from '../../../types/account.dto';
import { BankDTO, BankResponsDTO } from '../../../types/bank.dto';
import { BaseResponse } from '../../../types';


function Carts() {

    const [bankCarts, setBankCarts] = useState<BankResponsDTO[]>([])

    useEffect(() => {

        apiGetAccount()
            .then((res: BaseResponse<AccountDTO>) => {
                setBankCarts(res.result.bank_account as BankResponsDTO[])
            })

    }, [])

    // * Renders the carts component with a Topbar, new cart link, and existing Cart components.
    return (
        <>
            <Navbar />
            {/* tobar component */}
            <Topbar title='کارت ها' showBtn={false} />
            <div className={style.carts}>
                <div className={style.cartsRight}>
                    <Link href={'/addnewcart'} className={style.cartsLink}>
                        <span>افزودن کارت جدید</span>
                        <FaPlus />
                    </Link>
                </div>
                <div className={style.cartsLeft}>
                    <h2 className={style.cartsTitle}>کارت های شما</h2>
                </div>

            </div>
            {/*  cart component inclusive titile and cartnumber props  */}

            {
                bankCarts.length > 0 && bankCarts.map((bankCart, index) => (

                    <Cart
                        key={index}
                        title={bankCart.name}
                        cartnumber={bankCart.bank_number}
                        imgSrc={bankCart.bank_slug}
                        cartID={bankCart.ID}
                    />

                ))
            }

        </>
    );
}
export default Carts;
