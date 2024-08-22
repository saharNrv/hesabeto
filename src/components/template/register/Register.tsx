import React, { useState } from 'react';
import style from './register.module.css'
import Input from '@/components/module/inputwrap/Input';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';
import { apiSignUp } from '../../../../api/account';
import { AUTH_TOKEN_KEY } from '../../../../common/const';
import { useRouter } from 'next/navigation';
import { LoginInputDTO } from '../../../../types/account.dto';
import { BaseResponse } from '../../../../types';
import { TokenBandlerDTO } from '../../../../types/tokenbandler.dto';


export default function Register({ showloginForm }: any) {
    const router = useRouter()



    const [mobile, setMobile] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [retryPass, setRetryPass] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)

    // function signupHandler
    const signupHandler = (event:any) => {
        event.preventDefault()
        setLoader(true)

        // valid password
        if (pass === retryPass) {

            const inputSignupUser : LoginInputDTO = {
                user_name: mobile,
                password: pass
            }
            apiSignUp(inputSignupUser)
                .then((res: BaseResponse<TokenBandlerDTO>) => {
                    if (res.result !== null) {

                        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(res.result))
                        router.replace('/')

                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoader(false))

        } else {
            console.log('invalid password');
            setLoader(false)
        }

    }

    return (
        <>
            {/* login body */}
            <div className={style.loginBody}>
                <p className={style.loginBodyTitle}>ایجاد حساب کاربری جدید</p>
                <form className={style.loginForm}>
                    <Input
                        title={'شماره موبایل یا ادرس ایمیل'}
                        placeholder={'شماره موبایل یا ادرس ایمیل خود را وارد کنید'}
                        onChange={(value) => setMobile(value)}
                        value={mobile}
                        type={'text'}
                    />
                    <Input
                        title={'رمز عبور'}
                        placeholder={'رمز عبور خود را وارد کنید'}
                        onChange={(value) => setPass(value)}
                        value={pass}
                        type={'password'}

                    />
                    <Input
                        title={'تکرار رمز عبور'}
                        placeholder={'رمز عبور خود را تکرار کنید'}
                        onChange={(value) => setRetryPass(value)}
                        value={retryPass}
                        type={'password'}
                    />
                    <div className={style.loginBtnWrap}>
                        <button onClick={signupHandler} className={style.loginBtn}>
                            <span>ورود به حساب کاربری</span>
                            <FiLogOut />
                        </button>
                    </div>
                </form>


            </div>

            <div className={style.registerPage}>
                <p className={style.registerPageTitle}>حساب کاربری دارید؟</p>
                <button onClick={showloginForm} className={style.registerPageBtn}>واردشوید</button>
            </div>
        </>
    );
}
