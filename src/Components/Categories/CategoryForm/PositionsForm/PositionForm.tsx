import React from "react";
import {FormPositions} from "../../../Component/Forma/FormaPositions";
import {PositionsType} from "../../../../State/positions-reducer";
import {useDispatch} from "react-redux";
import s from './PositionForm.module.css'
type PropsType = {
    isDisabled: boolean
    positionId: string | undefined
    categoryId: string
    token: string | null
    name: string
    cost: number
    ofForm: (isForm: boolean) => void
    positionThunk: (token: string | null, position: PositionsType) => void
}
export const PositionForm: React.FC<PropsType> = ({isDisabled, positionId, name, cost, categoryId, token, ofForm, positionThunk}) => {

    const dispatch = useDispatch()
    const submit = (values: any, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
        const position: PositionsType = {
            _id: positionId,
            name: values.name,
            cost: values.cost,
            category: categoryId,
        }
        dispatch(positionThunk(token, position))
        dispatch(ofForm(false))
        setSubmitting(false)
    }
    const changeIsForm = () => {
        dispatch(ofForm(false))
    }
    return (
        <div>
            <FormPositions isDisabled={isDisabled} name={name} cost={cost} submit={submit} changeIsForm={changeIsForm}/>
            <div className={s.modalOverlay} onClick={changeIsForm}/>
        </div>
    )
}
