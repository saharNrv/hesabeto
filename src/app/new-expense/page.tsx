"use client"
import Topbar from '@/components/module/topbar/Topbar';
import React, { useEffect, useState } from 'react';
import style from '@/styles/NewExpense.module.css'
import Input from '@/components/module/inputwrap/Input';
import { MdArrowDropDown } from "react-icons/md";
import Navbar from '@/components/module/navbar/Navbar';
import Modal from '@/components/module/modal/Modal';
import { apiGetAccount } from '../../../api/account';
import Image from 'next/image';
import { date2Timestamp } from '../../../lib/date';
import { apiPostExpenses } from '../../../api/expenses';
import { categoryName, getDate, replaceFaNum2EnNum } from '../../../lib/string';
import { useRouter } from 'next/navigation';
import { BankDTO, BankResponsDTO, initialBankDto, initialBankResponse } from '../../../types/bank.dto';
import { ExpensesInputDTO } from '../../../types/expenses.dto';

export default function NewExpense() {
    // state
    const router = useRouter()
    const [account, setAccount] = useState<BankResponsDTO[]>([])
    const [infoCart, setInfoCart] = useState<BankResponsDTO>(initialBankResponse)
    const [price, setPrice] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [note, setNote] = useState<string>('')
    const [showModalCartBank, setShowModalCartBank] = useState<boolean>(false)
    const [showModalDate, setShowModalDate] = useState<boolean>(false)
    const [showModalCategory, setShowModalCategory] = useState<boolean>(false)

    const [date, setDate] = useState({
        day: 0,
        month: 0,
        year: 0,
        hour: 0,
        minute: 0
    })


    // function
    const showCartBankHandler = ():void => {
        setShowModalCartBank(true)
    }

    const closeModalHandler = ():void => {
        setShowModalCartBank(false)
        setShowModalDate(false)
        setShowModalCategory(false)

    }

    const choiceCartHandler = (info:BankResponsDTO) => {
        setInfoCart(info)
        setShowModalCartBank(false)
    }

    const changeCategory = (categoryValue:string) => {

        setCategory(categoryValue)
        setShowModalCategory(false)

    }

    const submitNewExpensesHandler = () => {

        const newExpenses:ExpensesInputDTO = {
            amount: Number(price),
            bank_id: infoCart.ID,
            bank_name: infoCart.name,
            bank_number: infoCart.bank_number,
            category: category,
            date: date,
            note: note,
            bank_slug: infoCart.bank_slug
        }



        apiPostExpenses(newExpenses)
            .then((res) => {
                if (res.result !== null) {
                    router.replace('/')
                }
            })



    }



    // useeffect
    useEffect(() => {
        apiGetAccount()
            .then(res => {

                if (res.result !== null) {
                    setAccount(res.result.bank_account as BankResponsDTO[])

                }

            })
    }, [])


    return (
        <div>
            <Navbar />
            <Topbar title={'ایجاد خرج جدید'} showBtn={false} />
            <div className={style.newexpense} >
                <Input title={'مبلغ'} placeholder={'2000 تومان'} value={price} type={'number'} onChange={(value) => setPrice(value)} />

                <div className={style.newexpenseBtnWrap}>
                    <p className={style.newexpenseBtnSubTitle}>دسته بندی</p>
                    <div className={style.newexpenseBtnContent}>

                        <button className={style.newexpenseBtn} onClick={() => setShowModalCategory(true)}>
                            <span className={style.newexpenseBtnTitle}>
                                {categoryName(category)}
                            </span>
                            <MdArrowDropDown />
                        </button>
                    </div>

                </div>

                <div className={style.newexpenseBtnWrap}>
                    <p className={style.newexpenseBtnSubTitle}>تاریخ و زمان</p>
                    <div className={style.newexpenseBtnContent}>

                        <button className={style.newexpenseBtn} onClick={() => setShowModalDate(true)}>
                            <span className={style.newexpenseBtnTitle}>
                                {
                                    getDate(date)
                                }
                            </span>

                        </button>
                    </div>

                </div>

                <div className={style.newexpenseBtnWrap}>
                    <p className={style.newexpenseBtnSubTitle}>کارت بانکی</p>
                    <div className={style.newexpenseBtnContent}>

                        <button className={style.newexpenseBtn} onClick={showCartBankHandler}>
                            <span className={style.newexpenseBtnTitle}>
                                {infoCart.name === '' ? 'کارت خود را انتخاب کنید' : infoCart.name}
                            </span>
                            <MdArrowDropDown />
                        </button>
                    </div>

                </div>

                <div className={style.newexpenseBtnWrap}>
                    <p className={style.newexpenseBtnSubTitle}>توضیحات</p>
                    <div className={style.newexpenseBtnContent}>

                        <textarea
                            className={style.newexpenseTextarea}
                            placeholder='توضیحات را وارد کنید'
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                        ></textarea>
                    </div>
                    <div className={style.newexpenseSubmit}>
                        <button className={style.newexpenseSubmitBtn} onClick={submitNewExpensesHandler}>تایید</button>
                    </div>

                </div>



            </div>

            {/* modal for  choice bank cart*/}

            <Modal title={'کارت بانکی خود را انتخاب کنید'} show={showModalCartBank} onClose={closeModalHandler}>
                <div className={style.cartBankBtnWrap}>

                    {
                        account.map((cartBank:BankResponsDTO, index:number) => (

                            <button key={index} className={style.cartBankBtn} onClick={() => choiceCartHandler(cartBank)}>

                                <Image
                                    className={style.cartBankBtnImg}
                                    width={50}
                                    height={50}
                                    src={`/icon/${cartBank.bank_slug}.png`}
                                    alt={cartBank.bank_slug}
                                />
                                <div className={style.cartBankBtnInfo}>
                                    <span className={style.cartBankBtnInfoName}>{cartBank.name}</span>
                                    <p className={style.cartBankBtnInfoCartNumber}>{cartBank.bank_number}</p>
                                </div>
                            </button>
                        ))
                    }
                </div>

            </Modal>

            {/* modal for choice date */}

            <Modal title={'تاریخ را انتخاب کنید'} show={showModalDate} onClose={closeModalHandler}>

                <div className={style.dateWrapper}>
                    <div className={style.dateWrapperInput}>

                        <input type="text" placeholder='روز' maxLength={2} onChange={(event) => setDate({
                            ...date,
                            day: +replaceFaNum2EnNum(event.target.value)
                        })} className={style.dateInput} />
                        <input type="text" placeholder='ماه' maxLength={2} onChange={(event) => setDate({
                            ...date,
                            month: +replaceFaNum2EnNum(event.target.value)
                        })} className={style.dateInput} />
                        <input type="text" placeholder='سال' maxLength={4} onChange={(event) => setDate({
                            ...date,
                            year: +replaceFaNum2EnNum(event.target.value)
                        })} className={style.dateInput} />
                    </div>

                    <button onClick={closeModalHandler} className={style.dateBtn}>تایید</button>
                </div>

            </Modal>

            {/* choice for category  */}

            <Modal title={'دسته بندی را انتخاب کنید'} show={showModalCategory} onClose={closeModalHandler} >

                <div className={style.categoryWrap}>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Food")}>غذا</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Transport")}>سفر</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Entertainment")}>سرگرمی</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Health")}>سلامتی</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Education")}>تحصیل</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Shopping")}>خرید</button>
                    <button className={style.categoryBtn} onClick={() => changeCategory("Other")}>سایر</button>
                </div>

            </Modal>

        </div>
    );
}


