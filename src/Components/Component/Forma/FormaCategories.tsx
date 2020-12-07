import React, {ChangeEvent} from 'react'
import {Field, Form, Formik} from "formik";
import s from '../../Categories/CategoryForm/CategoryForm.module.css'

type PropsType = {
    name: string
    imageSrc: string
    isDisabledC: boolean
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
    onImageChange: (e: any) => void
    submit: (value: any, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => void
}

export const FormCategories: React.FC<PropsType> = (props) => {
    return (
        <Formik
            initialValues={{name: '', imageSrc: ''}}
            onSubmit={props.submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className={s.form}>
                        <div className={s.field}>
                            <Field type='text' name='name' placeholder='name' value={props.name} onChange={props.onNameChange}/>
                        </div>
                        <div className={s.fieldPhoto}>
                            <Field type='file' name='imageSrc' onChange={props.onImageChange}/>
                        </div>
                        <div className={s.btn} >
                            <button className={props.isDisabledC ? s.active : ''} type='submit' disabled={isSubmitting || props.isDisabledC}>
                                Save
                            </button>
                        </div>
                    </div>

                    {props.imageSrc && <div className={s.photo}>
                        <img src={props.imageSrc ? `http://localhost:5000/${props.imageSrc}` : ''} alt=''/>
                    </div>}
                </Form>
            )}
        </Formik>
    )
}