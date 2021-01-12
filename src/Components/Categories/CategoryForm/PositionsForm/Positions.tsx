import React, {useEffect} from "react";
import {Position} from "./Position";
import {useDispatch, useSelector} from "react-redux";

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
    PositionsSelector
} from "../../../../State/Reselect/position-reselect";
import {TokenSelector} from "../../../../State/Reselect/auth-reselect";
import {Preloader} from "../../../Component/Preloader/Preloader";

type PropsType = {
    categoryId: string
}

export const Positions: React.FC<PropsType> = React.memo(({categoryId}) => {
    const isForm = useSelector(IsFormSelector)
    const isUpdate = useSelector(IsUpDateSelector)
    const token = useSelector(TokenSelector)
    const positions = useSelector(PositionsSelector)
    const position = useSelector(PositionSelector)
    const isDisabled = useSelector(IsDisabledSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPositionsThunk(token, categoryId))
    }, [position, token, categoryId, dispatch])
    const changeIsForm = () => {
        dispatch(actions.isFormAC(true))
    }

    return <>
        <div className="row">
            <div className="col s12">
                <div className="page-subtitle">
                    <h4>Positions:</h4>
                    <button className="waves-effect waves-light btn grey darken-1 btn-small modal-trigger"
                            data-target="create-modal" onClick={changeIsForm}>
                        Add positions
                    </button>
                </div>
                {!positions ? <Preloader/>
                : positions.length !== 0
                    ? <Position positions={positions} token={token} categoryId={categoryId}/>
                    : <div className="center">
                        There are no positions in the category
                    </div>
                }
            </div>
        </div>
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
    </>
})
