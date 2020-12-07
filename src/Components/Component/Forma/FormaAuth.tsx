import * as React from 'react'
import s from '../../Login/Login.module.css'
import {Field, Form, Formik} from "formik";
import {User} from '../../../State/auth-reducer'
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import cn from 'classnames'
import {IsDisabledAuthSelector} from "../../../State/Reselect/auth-reselect";

type PropsType = {
    namePage: string
    nameBtn: string
    thunkCreator: (user: User) => void
}

export const FormPage: React.FC<PropsType> = ({namePage, nameBtn,thunkCreator}) => {
    const isDisabled = useSelector(IsDisabledAuthSelector)
    const dispatch = useDispatch()
    const submit = (values: User, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const user: User = {
            email: values.email,
            password: values.password
        }
        dispatch(thunkCreator(user))
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className={s.header}>
                        <NavLink className={s.title} to='/login'>Newborn</NavLink>
                        <div className={s.auth}>
                            <div className={s.login}>
                                <NavLink  to='/login'>Login in</NavLink>
                            </div>
                            <div className={s.login}>
                                <NavLink to='/register'>Register</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={s.block}>
                        <div className={s.card}>
                            <div className={s.content}>
                                <span className={s.cardTitle}>{namePage}</span>
                                <div className={s.field}>
                                    <Field clssName={s.active} type='text' name='email' placeholder='email'/>
                                </div>
                                <div className={s.field}><Field type='password' name='password' placeholder='password'/></div>
                            </div>
                            <div className={s.action}>
                                <button className={cn(s.btn, '' + (isDisabled ? s.active : ''))} type='submit' disabled={isSubmitting || isDisabled}>
                                    {nameBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
