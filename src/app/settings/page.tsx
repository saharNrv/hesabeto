"use client"
import Topbar from '@/components/module/topbar/Topbar';
import React, {  useEffect, useState } from 'react';
import style from '@/styles/Settings.module.css'
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import Modal from '@/components/module/modal/Modal';
import Navbar from '@/components/module/navbar/Navbar';
import { apiGetAccount } from '../../../api/account';
import { AUTH_TOKEN_KEY } from '../../../common/const';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/protectedLayout/ProtectedLayout';
import { date2Timestamp } from '../../../lib/date';
import { AccountDTO, initialAccount } from '../../../types/account.dto';
import { BaseResponse } from '../../../types';

export default function Settings() {

    
    const router = useRouter()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalLanguage, setShowModalLanguage] = useState<boolean>(false)
    const [account, setAccount] = useState<AccountDTO>(initialAccount)



    //  A function that shows a modal.
    const showModalHandler = () => {
        setShowModal(true)

    }
    //  A function that shows a modal Language.

    const showLanguageModalHandler = () => {
        setShowModalLanguage(true)

    }
    //  A function that close a modal.
    const closeModalHandler = () => {

        setShowModal(false)
    }
    //  A function that close a modal Language.
    const closeModalHandlerLanguage = () => {

        setShowModalLanguage(false)
    }
    // get account data
    useEffect(() => {

        apiGetAccount()
            .then((res: BaseResponse<AccountDTO>) => {
                console.log(res);
                if (res.result !== null) {
                    console.log(res);
                    setAccount(res.result)

                }
            })

    }, [])

    //logout handler

    const logoutHandler = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        router.replace('/login-register')
    }

    return (
        <ProtectedLayout>
            <div className={style.settingsWrap}>
                <Navbar />
                {/* tobar component */}
                <Topbar title={'تنظیمات'} showBtn={true} linkBtnUrl={'/'} />
                {/* setting info */}
                <div className={style.settingInfoWrap}>
                    <div className={style.settingIconWrap}>
                        <FaUser className={style.settingIcon} />
                    </div>
                    <div className={style.settingInfo}>
                        <h3>
                            {(account && account.full_name !== '') ? account.full_name : 'نام کاربری'}

                        </h3>
                        <p>
                            تاریخ عضویت: 
                            {
                                account && (
                                    Intl.DateTimeFormat(['fa'], {
                                        year: 'numeric',
                                    }).format(date2Timestamp(account.CreatedAt))
                                )
                            }/
                             {
                                account && (
                                    Intl.DateTimeFormat(['fa'], {
                                        month: 'long',
                                    }).format(date2Timestamp(account.CreatedAt))
                                )
                            }/
                            {
                                account && (
                                    Intl.DateTimeFormat(['fa'], {
                                        day: '2-digit',
                                    }).format(date2Timestamp(account.CreatedAt))
                                )
                            }
                            
                            {/* {
                                account && (
                                    Intl.DateTimeFormat(['fa'], {
                                        weekday: 'long',
                                    }).format(date2Timestamp(account.CreatedAt))
                                )
                            } */}


                        </p>
                    </div>

                </div>
                {/* setting user account */}
                <div className={style.settingUser}>
                    <p className={style.settingUserTitle}>تنظیمات حساب کاربری</p>
                    <Link href={'/edit-user-account'} className={style.settingUserLink}>
                        <div className={style.settingUserIconWrap}>
                            <FaUser />
                            <p className={style.settingUserIconText}>ویرایش حساب کاربری</p>
                        </div>
                        <IoIosArrowBack />
                    </Link>
                    <Link href={'/edit-password'} className={style.settingUserLink}>
                        <div className={style.settingUserIconWrap}>
                            <FaLock />
                            <p className={style.settingUserIconText}>ویرایش رمز عبور</p>
                        </div>
                        <IoIosArrowBack />
                    </Link>
                    <Link href={''} onClick={showModalHandler} className={style.settingUserLink}>
                        <div className={style.settingUserIconWrap}>
                            <MdLogout />
                            <p className={style.settingUserIconText}>خروج حساب کاربری</p>
                        </div>
                        <IoIosArrowBack />
                    </Link>

                </div>
                {/* setting program */}
                <div className={style.settingUser}>
                    <p className={style.settingUserTitle}>تنظیمات برنامه</p>
                   
                  
                    <Link href={''} onClick={showLanguageModalHandler} className={style.settingUserLink}>
                        <div className={style.settingUserIconWrap}>
                            <MdLanguage />
                            <p className={style.settingUserIconText}>ویرایش زبان</p>
                        </div>
                        <IoIosArrowBack />
                    </Link>


                </div>

                {/* show modal logout */}
                <Modal show={showModal} onClose={closeModalHandler} title={'خروج از حساب کاربری'}>
                    <div className={style.logoutwrraper}>
                        <p className={style.logoutSubTitle}>ایا میخواهید از حساب کاربری خارج شوید؟</p>
                        <div className={style.logoutBtnWrap}>

                            <button className={style.logoutBtn1} onClick={closeModalHandler}>انصراف</button>
                            <button className={style.logoutBtn2} onClick={logoutHandler}>تایید</button>
                        </div>
                    </div>

                </Modal>
                {/* show modal language */}
                <Modal show={showModalLanguage} onClose={closeModalHandlerLanguage} title={"تغییر زبان"}>
                    <div className={style.languageWrapper}>
                        <p className={style.languageTitle}>زبان خود را تغییر دهید</p>
                        <div className={style.languageBtnWrap}>
                            <button>فارسی</button>
                            <button>English</button>
                        </div>
                    </div>

                </Modal>
            </div>
        </ProtectedLayout>

    );
}