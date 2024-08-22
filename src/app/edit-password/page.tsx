"use client"
import React, { useState } from 'react';
import style from '@/styles/Edit-password.module.css'
import Topbar from '@/components/module/topbar/Topbar';
import Input from '@/components/module/inputwrap/Input';
import Navbar from '@/components/module/navbar/Navbar';
import { apiChangePassword } from '../../../api/account';
import { useRouter } from 'next/navigation';
import { ChangePasswordDTO } from '../../../types/account.dto';


export default function EditPassword() {
    const router = useRouter()
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const changePassword = (event:any)=>{
        event.preventDefault()

        const newPass: ChangePasswordDTO={
            new_password:newPassword,
            retry_password:repeatPassword
        }

        apiChangePassword(newPass)
                 .then(res=>{
                   
                    if(res.result !== null){
                       router.back()
                    }
                    
                 })

    }

    return (
        <>
            <Navbar />
            <div className={style.editPassword}>
                <Topbar title={'تغییر رمز عبور'} showBtn={true} linkBtnUrl={'/settings'} />
                <form className={style.editPasswordForm}>
                    <Input
                        title={'رمز عبور فعلی'}
                        placeholder={'رمز عبور فعلی خود را وارد کنید'}
                        value={oldPassword}
                        onChange={(value)=>setOldPassword(value)}
                        type={"text"}
                    />
                    <Input
                        title={'رمز عبور جدید'}
                        placeholder={'رمز عبور جدید خود را وارد کنید'}
                        value={newPassword}
                        onChange={(value)=>setNewPassword(value)}
                        type={"text"}
                    />
                    <Input
                        title={'تکرار رمز عبور جدید'}
                        placeholder={'رمز عبور جدید خود را تکرار کنید'}
                        value={repeatPassword}
                        onChange={(value)=>setRepeatPassword(value)}
                        type={"text"}
                    />
                    <div className={style.formBtn}>

                        <button onClick={changePassword}>تایید</button>
                    </div>

                </form>

            </div>
        </>

    );
}
