import React from "react";
import {OrderPosition} from "../../../State/order-reducer";
import m from '../../Categories/CategoryForm/PositionsForm/PositionForm.module.css'
import s from './ListModal.module.css'
type PropsType = {
    numberOrder?:number
    orderPrice: number
    order: Array<OrderPosition>
    deleteOrder?: (id: string | undefined) => void
}

export const ListModal: React.FC<PropsType> = ({numberOrder, orderPrice, order, deleteOrder}) => {
    return (
        <div className={m.content}>
            {numberOrder
                ? <h4>Order №{numberOrder}</h4>
                : <h4>You order</h4>
            }
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th/>
                </tr>
                </thead>

                {order.map(o => <tbody key={o._id}>
                <tr>
                    <td>{o.name}</td>
                    <td>{o.quantity}</td>
                    <td>{o.cost}</td>
                    {deleteOrder && <td><button className={s.deleteBtn} onClick={() => deleteOrder(o._id)}><i>delete</i></button></td>}
                </tr>
                </tbody>)}
            </table>
            <div className={s.orderSummary}>
                <p>Total cost <strong>{orderPrice} uah.</strong></p>
            </div>
        </div>
    )
}