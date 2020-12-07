import React from "react";
import {actions, getPositionsThunk, PositionsType, removePositionsThunk} from "../../../../State/positions-reducer";
import {useDispatch} from "react-redux";
import s from './Positions.module.css'

type PropsType = {
    removePositionOnId: Array<string | undefined>
    token: string | null
    position: PositionsType
    categoryId:string
}

export const Position: React.FC<PropsType> = ({removePositionOnId, token, position, categoryId}) => {
    const dispatch = useDispatch()
    const removePosition = (positionId: string | undefined) => {
        dispatch(removePositionsThunk(token, positionId))
        dispatch(getPositionsThunk(token, categoryId))
    }
    const changeUpDate = () => {
        dispatch(actions.setPosition(position))
        dispatch(actions.isUpaDate(true))
    }
    return (
        <div className={s.collection}>
            <div className={s.position} onClick={changeUpDate}>
                <span>
                    {position.name} <strong>{position.cost} uah.</strong>
                </span>
            </div>
            <div className={s.deletePosition}>
                <button disabled={removePositionOnId.some(id => id === position._id)} onClick={()=>removePosition(position._id)}>
                    <i>delete</i>
                </button>
            </div>
        </div>
    )
}