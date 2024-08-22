"use client"
import React, { useEffect, useState } from 'react';
import style from '@/styles/Addnewcart.module.css'
import Topbar from '@/components/module/topbar/Topbar';
import Input from '@/components/module/inputwrap/Input';
import Navbar from '@/components/module/navbar/Navbar';
import Modal from '@/components/module/modal/Modal';
import { apiGetAllBank, apiPostBank } from '../../../api/bank';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { replaceFaNum2EnNum } from '../../../lib/string';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { BankDTO, BankInfoDTO, BankInput, BankResponsDTO } from '../../../types/bank.dto';
import { BaseResponse } from '../../../types';
export default function AddNewCart(): React.JSX.Element {

    const router: AppRouterInstance = useRouter()

    
    const [bank, setBank] = useState<BankInfoDTO>({
        name: '',
        bank_slug: ''
    })
    const [cartNumber, setCartNumber] = useState<string>('')
    const [cartName, setCartName] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [allBanks, setAllBanks] = useState<BankInfoDTO[]>([])


    // choice bank handler func
    const choiceBank = (event:any) => {
        event.preventDefault()
        setShowModal(true)


    }
    // close modal handler
    const closeModal = ():void => {
        setShowModal(false)
    }

    useEffect(():void => {
        apiGetAllBank()
            .then((res:BaseResponse<BankInfoDTO[]>) => {
                
                if (res.result !== null) {

                    setAllBanks(res.result)
                }
            })
    }, [])

    // select bank_slug
    const selectBank = (bankInfo:BankInfoDTO) => {
        setBank(bankInfo)
        setShowModal(false)
    }

    // submit handler
    const submitHandler = (event:any) =>{
        event.preventDefault()

        const newCart: BankInput={
            bank_number:Number(replaceFaNum2EnNum(cartNumber)),
            bank_slug:bank.bank_slug,
            name:cartName
        }

        apiPostBank(newCart)
                .then((res:BaseResponse<BankResponsDTO>):void=>{
                    if(res.result !== null ){

                        router.replace('/carts')
                    }
                })
    }


    return (
        <>
            <Navbar />
            {/* topbar component */}
            <Topbar title={'ایجاد کارت جدید'}  />
            <div className={style.addnewcart} >


                {/* <div className={style.formWrapper}> */}
                <form className={style.form}>

                    <div className={style.addnewcartBtnWrap}>
                        <h4 className={style.addnewcartBtnTitle}>بانک</h4>
                        <button className={style.addnewcartBtn} onClick={choiceBank}>
                            {
                                bank.name === '' ? "بانک خود را انتخاب کنید" : bank.name
                            }
                        </button>
                    </div>
                    <Input
                        title={'شماره کارت'}
                        placeholder={'شماره کارت را وارد کنید'}
                        value={cartNumber}
                        onChange={(value) => setCartNumber(value)}
                         type={"text"}
                    />
                    <Input
                        title={'نام'}
                        placeholder={'نام کارت را وارد کنید'}
                        value={cartName}
                        onChange={(value) => setCartName(value)}
                        type={"text"}
                    />

                    <div className={style.formBtn}>

                        <button onClick={submitHandler} >تایید</button>
                    </div>
                </form>
                {/* </div> */}




            </div>

            {/* modal */}
            <Modal title={'بانک خود را انتخاب کنید'} show={showModal} onClose={closeModal}>

                <div className={style.gridContainer}>

                    {
                        allBanks.length > 0 && allBanks.map((bank, index) => (
                            <button key={index} onClick={() => selectBank({
                                name: bank.name,
                                bank_slug: bank.bank_slug
                            })}>
                                <span>{bank.name}</span>

                                <Image
                                    src={`/icon/${bank.bank_slug}.png`}
                                    width={30}
                                    height={30}
                                    alt={bank.bank_slug}
                                />
                            </button>
                        ))
                    }

                </div>

            </Modal>

        </>
    );
}
