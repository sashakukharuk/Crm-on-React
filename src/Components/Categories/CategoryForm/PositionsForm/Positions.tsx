import React, {useEffect} from "react";
import {Position} from "./Position";
import {useDispatch, useSelector} from "react-redux";
import s from './Positions.module.css'

import {
    actions,
    createPositionsThunk,
    getPositionsThunk,
    updatePositionsThunk
} from "../../../../State/positions-reducer";
import {PositionForm} from "./PositionForm";
import {
    IsDisabledSelector,
    IsFormSelector,
    IsUpDateSelector,
    PositionSelector,
    PositionsSelector, RemovePositionSelector
} from "../../../../State/Reselect/position-reselect";
import {TokenSelector} from "../../../../State/Reselect/auth-reselect";

type PropsType = {
    categoryId: string
}

export const Positions: React.FC<PropsType> = ({categoryId}) => {
    const isForm = useSelector(IsFormSelector)
    const isUpdate = useSelector(IsUpDateSelector)
    const token = useSelector(TokenSelector)
    const positions = useSelector(PositionsSelector)
    const position = useSelector(PositionSelector)
    const isDisabled = useSelector(IsDisabledSelector)
    const removePosition = useSelector(RemovePositionSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPositionsThunk(token, categoryId))
    }, [position, token, categoryId, dispatch])
    const changeIsForm = () => {
        dispatch(actions.isFormAC(true))
    }
    return (
        <div>
            <div className={s.pageSubtitle}>
                <h4>Positions:</h4>
                <button onClick={changeIsForm}>
                    Add positions
                </button>
            </div>
            {positions.length !== 0
                ? positions.map(p => <Position key={p._id} position={p} token={token} categoryId={categoryId} removePositionOnId={removePosition}/>)
                : <div>
                    There are no positions in the category
                </div>
            }
            {isForm && <PositionForm
                isDisabled={isDisabled}
                positionId={position._id}
                name={''}
                cost={1}
                categoryId={categoryId} ofForm={actions.isFormAC}
                token={token} positionThunk={createPositionsThunk}/>}
            {isUpdate && <PositionForm
                isDisabled={isDisabled}
                positionId={position._id}
                name={position.name}
                cost={position.cost}
                categoryId={categoryId} ofForm={actions.isUpaDate}
                token={token} positionThunk={updatePositionsThunk}/>}
        </div>
    )
}
