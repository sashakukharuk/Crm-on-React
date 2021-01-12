import React, {useEffect} from 'react'
import {useFormik} from "formik";
import s from '../../Categories/CategoryForm/PositionsForm/PositionForm.module.css'
import cn from 'classnames'
import {PositionsType} from "../../../State/positions-reducer";
import {MaterialService} from "../Material/Material";

type PropsType = {
    name: string
    cost: number
    isDisabled: boolean
    changeIsForm: () => void
    onSubmit: (values: PositionsType) => void
}

type Error = {
    name: string
    cost: string
}

export const FormPositions: React.FC<PropsType> = ({name, cost, isDisabled, onSubmit, changeIsForm}) => {

    const validate = (values: PositionsType) => {
        const error = {} as Error
        if (!values.name) {
            error.name = 'Required'
        }

        if (!values.cost) {
            error.cost = 'The cost have not to less 1'
        }

        return error
    }

    useEffect(() => {
        MaterialService.updateTextInputs()
    }, [])

    const formik = useFormik({
        initialValues: {name, cost},
        validate,
        onSubmit
    })

    return <form className={s.modal} onSubmit={formik.handleSubmit}>
        <div className={cn("modal-content", s.contentModal)}>
            <h4 className="mb1">Add position</h4>
            <div className="input-field">
                <input id="pos-name" type='text' name='name'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.name}
                />
                <label htmlFor="pos-name">Name</label>
                <span className="helper-text red-text">
                    {formik.touched.name && formik.errors.name && <span>{formik.errors.name}</span>}
                </span>
            </div>
            <div className="input-field">
                <input id="pos-cost" type="number" name='cost' min='1'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.cost}
                />
                <label htmlFor="pos-cost">Цена</label>
                <span className="helper-text red-text">
                    {formik.touched.cost && formik.errors.cost && <span>{formik.errors.cost}</span>}
                </span>
            </div>
        </div>
        <div className={cn("modal-footer", s.footer)}>
            <button
                type="button"
                className="modal-action waves-effect waves-black btn-flat"
                disabled={isDisabled}
                onClick={changeIsForm}
            >
                Cancel
            </button>
            <button className=" modal-action btn waves-effect" type="submit" disabled={isDisabled}>Save</button>
        </div>
    </form>
}
