import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TokenSelector} from "../../../State/Reselect/auth-reselect";
import {PositionsSelector} from "../../../State/Reselect/position-reselect";
import {actions, getPositionsThunk} from "../../../State/positions-reducer";
import {actionsOrder} from "../../../State/order-reducer";
import {useParams} from 'react-router'
import {OrderPosition} from "./OrderPosition";


export const OrderPositions: React.FC = () => {
    const token = useSelector(TokenSelector)
    const positions = useSelector(PositionsSelector)
    const {id}: {id: string} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPositionsThunk(token, id))
    }, [dispatch, token, id])

    const onQuantityChange = (id: string | undefined, quantity: number) => {
        dispatch(actions.setQuantity(id, quantity))
    }

    const submitOrder = (name: string, cost: number, quantity: number, _id: string | undefined) => {
        const orderPosition = {
            name: name,
            cost: cost,
            quantity: quantity,
            _id: _id
        }
        dispatch(actionsOrder.setOrderPosition(orderPosition))
        dispatch(actionsOrder.isBtnCompleteAC(false))
    }

    return (
        <div>
            {positions.length !== 0
                ? <OrderPosition positions={positions} onQuantityChange={onQuantityChange} submitOrder={submitOrder}/>
                : <div>
                    There are no positions in the category
                </div>
            }
        </div>
    )
}

