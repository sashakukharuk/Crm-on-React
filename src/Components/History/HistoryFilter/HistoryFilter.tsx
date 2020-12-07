import React from 'react'
import {Field, Form, Formik} from "formik";
import {actionsOrder, Filter} from "../../../State/order-reducer";
import {useDispatch} from "react-redux";
import h from './HistoryFilter.module.css'


export const HistoryFilter: React.FC = () => {
    const dispatch = useDispatch()
    const submit = (values: any, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: Filter = {
            order: values.order,
            start: values.start,
            end: values.end
        }
        dispatch(actionsOrder.setFilter(filter))
        setSubmitting(false)
    }
    return (
        <Formik initialValues={{order: '', start: '', end: ''}} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form className={h.filter}>
                    <div className={h.fr}>
                        <div className={h.field}>
                            <Field type="number" id="number" name='order' min="1" placeholder='Order number'/>
                        </div>
                        <div className={h.field}>
                            <Field type="date" name='start' placeholder='Start'/>
                        </div>
                        <div className={h.field}>
                            <Field type="date" name='end' placeholder='End'/>
                        </div>
                    </div>
                    <button className={h.btn} disabled={isSubmitting}>
                        Apply filter
                    </button>
                </Form>
            )}
        </Formik>
    )
}