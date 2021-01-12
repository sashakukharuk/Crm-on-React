import React from 'react'
import {useFormik} from "formik";
import {User} from '../../../State/auth-reducer'

type PropsType = {
    namePage: string
    nameBtn: string
    isDisabled: boolean
    submitForm: (user: User) => void
}

export const FormPage: React.FC<PropsType> = ({namePage, nameBtn, isDisabled, submitForm}) => {
    const onSubmit = (values: User) => {
        const user: User = {
            email: values.email,
            password: values.password
        }
        submitForm(user)
    }

    const validate = (values: User) => {
        const errors = {} as User

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validate,
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="auth-block">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{namePage}</span>
                        <div className="input-field">
                            <input id="email" type="email" name='email' onChange={formik.handleChange}
                                   onBlur={formik.handleBlur} value={formik.values.email}/>
                            <label htmlFor="email">Email:</label>
                            <span className="helper-text red-text">
                             {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}
                            </span>

                        </div>
                        <div className="input-field">
                            <input id="password" type="password" name='password' onChange={formik.handleChange}
                                   onBlur={formik.handleBlur} value={formik.values.password}/>
                            <label htmlFor="password">Пароль:</label>
                            <span className="helper-text red-text">
                            {formik.touched.password && formik.errors.password ?
                                <span>{formik.errors.password}</span> : null}
                        </span>
                        </div>
                    </div>
                    <div className="card-action">
                        <button type='submit' className="modal-action btn waves-effect" disabled={isDisabled}>{nameBtn}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
