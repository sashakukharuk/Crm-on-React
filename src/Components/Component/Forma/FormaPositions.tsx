import React from 'react'
import {Field, Form, Formik} from "formik";
import s from '../../Categories/CategoryForm/PositionsForm/PositionForm.module.css'

type PropsType = {
    name: string
    cost: number
    isDisabled: boolean
    changeIsForm: () => void
    submit: (values: any, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => void
}

export const FormPositions: React.FC<PropsType> = ({name, cost, isDisabled,submit, changeIsForm}) => {
    return (
        <Formik
            initialValues={{name: name, cost: cost}}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form className={s.modal}>
                    <div className={s.content}>
                        <h4>Add position</h4>
                        <div className={s.field}>
                            <Field type='text' name='name' placeholder='name'/>
                        </div>
                        <div className={s.field}>
                            <Field type='number' name='cost'/>
                        </div>
                    </div>
                    <div className={s.footer}>
                        <button className={s.btnLeft} type='button' disabled={isSubmitting || isDisabled} onClick={changeIsForm}>
                            Cancel
                        </button>
                        <button className={s.btnRight} type='submit' disabled={isDisabled}>
                            Save
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}