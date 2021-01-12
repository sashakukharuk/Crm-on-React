import React from "react";
import {OrderPosition} from "../../State/order-reducer";
import {ListModal} from "../Component/Modal/ListModal";
import m from '../Categories/CategoryForm/PositionsForm/PositionForm.module.css'
import cn from 'classnames'

type PropsType = {
    orderPrice: number
    orderPosition: Array<OrderPosition>
    isBtnCreate: boolean
    orderModalChange: (isModal: boolean) => void
    deleteOrder: (id: string | undefined) => void
    onOrderClick: () => void
}

export const OrderModal: React.FC<PropsType> = ({orderPrice, orderModalChange, orderPosition, isBtnCreate, deleteOrder, onOrderClick}) => {
    return <div className={m.modal}>
        <ListModal orderPrice={orderPrice} order={orderPosition} deleteOrder={deleteOrder}/>
        <div className={cn("modal-footer", m.footer)}>
            <button className="modal-action waves-effect waves-black btn-flat"
                    onClick={() => orderModalChange(false)}>Cancel
            </button>
            <button className=" modal-action btn waves-effect" disabled={isBtnCreate} onClick={onOrderClick}>Confirm
            </button>
        </div>
    </div>
}
