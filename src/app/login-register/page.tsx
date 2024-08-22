"use client"
import React, { useState } from 'react';
import style from '@/styles/LoginRegister.module.css'
import { LiaCoinsSolid } from "react-icons/lia";
import Login from '@/components/template/login/Login';
import Register from '@/components/template/register/Register';
import Modal from '@/components/module/modal/Modal';
import { MdIosShare } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import Link from 'next/link';

export default function LoginRegister() {

  const [showModal, setShowModal] = useState<boolean>(true)
  const [authType, setAuthType] = useState<string>('login')
  // show register page
  const showRegisterForm = ():void => setAuthType('register');
  // show login page
  const showloginForm = ():void => setAuthType('login');

  return (
    <div className={style.loginWrap}>
      {/* login topbar */}
      <div className={style.loginTopbr}>
        <h2 className={style.loginTitleWrap}>
          <LiaCoinsSolid />
          <span className={style.loginTitle}>حسابتو</span>
        </h2>
        <p className={style.subTitle}>نرم افزار حسابداری تو</p>

      </div>
      {
        authType === 'login' ? (

          <Login showRegisterForm={showRegisterForm} />
        ) : (

          <Register showloginForm={showloginForm} />
        )
      }

      <Modal title={'وب اپلیکیشن حسابتو را به صفحه اصلی گوشی تان اضافه کنید '} show={showModal} onClose={() => setShowModal(false)}>

        {
          window.navigator.userAgent.includes('iPhone') ? (

            <div className={style.modalContent}>
              <ul className={style.modalList}>
                <li>
                  ۱. در نوار پایین دکمه
                  <MdIosShare />
                  «Share» را انتخاب کنید.
                </li>
                <li>
                  ۲.
                  در منو باز شده، گزینه ,
                  <CgAddR />
                  «Add to home screen»
                  را انتخاب کنید
                </li>
                <li>
                  ۳. در مرحله بعد “Add” را انتخاب کنید
                </li>
              </ul>
              <button onClick={() => setShowModal(false)} className={style.modalBtn}>متوجه شدم</button>
            </div>
          ) : (
            <div className={style.androidContent}>
              <p className={style.androidTitle}>برای دانلود اپلیکیشن اندروید </p>
              <Link className={style.androidLink} href={"https://hesabeto-app.s3.ir-tbz-sh1.arvanstorage.ir/Hesabeto.apk?versionId="}>
                کلیک کنید
              </Link>
            </div>

          )
        }

      </Modal>

    </div>
  );
}
