import React from "react";
import {OrderPosition} from "../../State/order-reducer";
import {ListModal} from "../Component/Modal/ListModal";
import m from '../Categories/CategoryForm/PositionsForm/PositionForm.module.css'

type PropsType = {
    orderPrice: number
    orderPosition: Array<OrderPosition>
    isBtnCreate: boolean
    orderModalChange: (isModal: boolean) => void
    deleteOrder: (id: string | undefined) => void
    onOrderClick: () => void
}

export const OrderModal: React.FC<PropsType> = ({orderPrice, orderModalChange, orderPosition, isBtnCreate, deleteOrder, onOrderClick}) => {
    return (
        <div className={m.modal}>
            <ListModal orderPrice={orderPrice} order={orderPosition} deleteOrder={deleteOrder}/>
            <div className={m.footer}>
                <button className={m.btnLeft} onClick={() => orderModalChange(false)}>Cancel</button>
                <button className={m.btnRight} disabled={isBtnCreate} onClick={onOrderClick}>Confirm</button>
            </div>
        </div>
    )
}