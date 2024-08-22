"use client"
import React, { useState } from 'react';
import style from '@/styles/Edit-user-account.module.css'
import Topbar from '@/components/module/topbar/Topbar';
import Input from '@/components/module/inputwrap/Input';
import Navbar from '@/components/module/navbar/Navbar';
import { apiChangeName } from '../../../api/account';
import { useRouter } from 'next/navigation';
import { ChangeNameDTO } from '../../../types/account.dto';

export default function EditUserAccount() {
    const router = useRouter()

    const [userName, setUserName] = useState<string>('')


    const changeNameHandler = (event:any) => {
        event.preventDefault()
        const changeInputUserName: ChangeNameDTO = {
            full_name: userName
        }


        apiChangeName(changeInputUserName)
            .then(res => {
                if (res.result !== null) {
                    router.replace('/')
                }
            })
    }

    return (
        <>
            <Navbar />
            <div className={style.editUser}>
                <Topbar title={'ویرایش حساب کاربری'} showBtn={true} linkBtnUrl={'/settings'} />
                <form className={style.editUserForm}>
                    <Input
                        title={'نام و نام خانوادگی'}
                        placeholder={'نام و نام خانوادگی وارد کنید'}
                        value={userName}
                        onChange={(value) => setUserName(value)}
                        type={"text"}
                    />
                    {/* <Input
                        title={'آدرس ایمیل'}
                        placeholder={'آدرس ایمیل خود را وارد کنید'}
                    />
                    <Input
                        title={'شماره موبایل'}
                        placeholder={'09456783456'}
                    /> */}
                    <div className={style.formBtn}>

                        <button onClick={changeNameHandler} >تایید</button>
                    </div>
                </form>

            </div>
        </>
    );
}
