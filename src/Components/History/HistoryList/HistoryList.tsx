import React from "react";
import {actionsOrder, Order} from "../../../State/order-reducer";
import {ListModal} from "../../Component/Modal/ListModal";
import m from '../../Categories/CategoryForm/PositionsForm/PositionForm.module.css'
import cn from 'classnames'
import {useDispatch} from "react-redux";
import {Tbody} from "./Tbody";

type PropsType = {
    orderPrice: number
    orders: Array<Order>
    order: Order
    isModal: boolean
}

export const HistoryList: React.FC<PropsType> = React.memo(({orderPrice, orders, order, isModal}) => {
    const dispatch = useDispatch()
    const onModal = (isModal: boolean, order: Order) => {
        dispatch(actionsOrder.setOrderAC(order))
        dispatch(actionsOrder.isModalAC(isModal))
    }
    return <div>
        <table className="highlight mb2">
            <thead>
            <tr>
                <th>№</th>
                <th>Data</th>
                <th>Time</th>
                <th>Sum</th>
                <th/>
            </tr>
            </thead>
            <Tbody orders={orders}/>
        </table>
        {isModal && <div>
            <div className={m.modalOverlay}/>
            <div className={m.modal}>
                <ListModal
                    orderPrice={orderPrice}
                    order={order?.list}
                    numberOrder={order.order}
                />
                <div className={cn("modal-footer", m.footer)}>
                    <button
                        className="modal-action waves-effect waves-black btn-flat"
                        onClick={() => onModal(false, {} as Order)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>}
    </div>
})
