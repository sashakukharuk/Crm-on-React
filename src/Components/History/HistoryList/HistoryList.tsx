import React from "react";
import {Order} from "../../../State/order-reducer";
import moment from "moment";
import {ListModal} from "../../Component/Modal/ListModal";
import s from '../../Component/Modal/ListModal.module.css'
import m from '../../Categories/CategoryForm/PositionsForm/PositionForm.module.css'
import h from './HistoryList.module.css'
type PropsType = {
    orderPrice: number
    orders: Array<Order>
    order: Order
    isModal: boolean
    computePrice: (order: Order) => number
    onModal: (isModal: boolean, order: Order) => void
}

export const HistoryList: React.FC<PropsType> = ({orderPrice, orders, order, isModal, computePrice, onModal}) => {
    return (
        <div className={h.list}>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Data</th>
                    <th>Time</th>
                    <th>Sum</th>
                    <th/>
                </tr>
                </thead>

                {orders.map(order => <tbody key={order._id}>
                <tr>
                    <td>{order.order}</td>
                    <td>{moment(order.date).format('DD.MM.yyyy')}</td>
                    <td>{moment(order.date).format('HH:mm:ss')}</td>
                    <td>{computePrice(order)} uah.</td>
                    <td>
                        <button className={h.btn} onClick={() => onModal(true, order)}>
                            <i>|_/</i>
                        </button>
                    </td>
                </tr>
                </tbody>)}
            </table>
            {isModal && <div>
                <div className={m.modalOverlay}/>
                <div className={m.modal}>
                    <ListModal
                        orderPrice={orderPrice}
                        order={order?.list}
                        numberOrder={order.order}
                    />
                    <div className={m.footer}>
                        <button className={m.btnLeft} onClick={() => onModal(false, {} as Order)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>}

        </div>
    )
}