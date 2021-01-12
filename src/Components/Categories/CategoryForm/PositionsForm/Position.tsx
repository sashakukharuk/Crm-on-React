import React from "react";
import {actions, getPositionsThunk, PositionsType, removePositionsThunk} from "../../../../State/positions-reducer";
import {useDispatch} from "react-redux";
import s from './Positions.module.css'

type PropsType = {
    token: string | null
    positions: PositionsType[]
    categoryId: string
}

export const Position: React.FC<PropsType> = React.memo(({token, positions, categoryId}) => {
    const dispatch = useDispatch()
    const removePosition = (positionId: string | undefined) => {
        dispatch(removePositionsThunk(token, positionId))
        dispatch(getPositionsThunk(token, categoryId))
    }
    const changeUpDate = (position: PositionsType) => {
        dispatch(actions.setPosition(position))
        dispatch(actions.isUpaDate(true))
    }

    return <div className="collection">
        {positions.map(position => <a key={position._id} className="collection-item collection-item-icon">
            <span className={s.item} onClick={() => changeUpDate(position)}>
               {position.name} <strong>{position.cost} uah.</strong>
            </span>
            <span>
                <i className="material-icons" onClick={() => removePosition(position._id)}>delete</i>
            </span>
        </a>)}
    </div>
})
