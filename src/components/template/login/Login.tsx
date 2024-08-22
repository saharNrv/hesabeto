"use client"
import React, { useState } from 'react';
import style from './login.module.css'
import Input from '@/components/module/inputwrap/Input';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';
import { apiSignIn } from '../../../../api/account';
import { AUTH_TOKEN_KEY } from '../../../../common/const';
import { useRouter } from 'next/navigation';
import Modal from '@/components/module/modal/Modal';
import { LoginInputDTO } from '../../../../types/account.dto';
import { BaseResponse } from '../../../../types';
import { TokenBandlerDTO } from '../../../../types/tokenbandler.dto';

// type LoginPropsDTO ={
//     showRegisterForm:string
// }

export default function Login({ showRegisterForm }:any) {
    const router = useRouter()

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>('')

    const signinHandler = (event:any) => {
        event.preventDefault()

        const inputSininUser:LoginInputDTO = {
            password: password,
            user_name: userName
        }

        apiSignIn(inputSininUser)
            .then((res: BaseResponse<TokenBandlerDTO>) => {
                if (res.result !== null) {
                    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(res.result))
                    router.replace('/')
                } else if (res.errors) {
                   setShowAlert(true)

                    if (res.errors.includes('record not found')) {

                        setErrorText('لطفا ثبت نام کنید')
                        setUserName('')
                        setPassword('')
                    } else if (res.errors.includes('account not found or password error')) {
                        setErrorText('رمز یا شماره موبایل اشتباه است')
                        setUserName('')
                        setPassword('')
                    }

                }
            })
            .catch(err => console.log(err))


    }





    return (
        <>
            {/* login body */}
            <div className={style.loginBody}>
                <p className={style.loginBodyTitle}>ورود به حساب کاربری</p>
                <form className={style.loginForm}>
                    <Input
                        title={'شماره موبایل یا ادرس ایمیل'}
                        placeholder={'شماره موبایل یا ادرس ایمیل خود را وارد کنید'}
                        value={userName}
                        onChange={(value) => setUserName(value)}
                        type={"text"}
                    />
                    <Input
                        title={'رمز عبور'}
                        placeholder={'رمز عبور خود را وارد کنید'}
                        value={password}
                        type={'password'}
                        onChange={(value) => setPassword(value)}
                    />
                    <div className={style.loginBtnWrap}>
                        <button className={style.loginBtn} onClick={signinHandler}>
                            <span>ورود به حساب کاربری</span>
                            <FiLogOut />
                        </button>
                    </div>
                </form>
                <div className={style.loginForgetPassword}>
                    <Link href={'/'} className={style.loginForgetPasswordLink}>
                        <span>رمز عبور خود را فراموش کردم!</span>
                        <FaLock />
                    </Link>
                </div>

            </div>

            <div className={style.registerPage}>
                <p className={style.registerPageTitle}>حساب کاربری ندارید؟</p>
                <button onClick={showRegisterForm} className={style.registerPageBtn}>ایجاد کنید</button>
            </div>

            {/*alert  */}

            <Modal title={'کاربر گرامی'} show={showAlert} onClose={() => setShowAlert(false)}>
                <p>
                    {
                        errorText
                    }
                </p>
                <button className={style.btnModal} onClick={() => setShowAlert(false)}>تلاش مجدد</button>

            </Modal>
        </>
    );
}
