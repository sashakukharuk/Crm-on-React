import React from 'react'
import {Field, Form, Formik} from "formik";
import {actionsOrder, Filter} from "../../../State/order-reducer";
import {useDispatch} from "react-redux";

export const HistoryFilter: React.FC = () => {
    const dispatch = useDispatch()

    const submit = (values: any, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
        if (values.start < values.end) {
            const filter: Filter = {
                order: values.order,
                start: values.start,
                end: values.end
            }
            dispatch(actionsOrder.setFilter(filter))
        }
        setSubmitting(false)
    }

    return (
        <Formik initialValues={{order: '', start: '', end: ''}} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form className="filter">
                    <div className="fr">
                        <div className="col order">
                            <div className="input-field inline order-position-input">
                                <Field type="number" id="number" name='order' min="1"/>
                                    <label htmlFor="number">Order number</label>
                            </div>
                        </div>
                        <div className="col filter-pickers">
                            <div className="input-field">
                                <Field type="date" name='start' className="datepicker"/>
                                    <label>Start</label>
                            </div>

                            <div className="input-field">
                                <Field type="date" name='end' className="datepicker"/>
                                    <label>End</label>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "block", textAlign: "left"}}>
                        <button type="submit" className="btn waves-effect wavers-light btn-small" disabled={isSubmitting}>Apply filter</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
