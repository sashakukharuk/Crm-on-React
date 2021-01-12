import React from "react";
import {actionsOrder, Order} from "../../../State/order-reducer";
import moment from "moment";
import {useDispatch} from "react-redux";

type PropsType = {
    orders: Array<Order>
}

export const Tbody: React.FC<PropsType> = React.memo(({orders}) => {
    const dispatch = useDispatch()
    const onModal = (isModal: boolean, order: Order) => {
        dispatch(actionsOrder.setOrderAC(order))
        dispatch(actionsOrder.isModalAC(isModal))
    }
    const computePrice = (order: Order): number => {
        return order.list.reduce((total, item) => {
            // @ts-ignore
            return total += item.quantity * item.cost
        }, 0)
    }

    return <>
        {orders.map(order => <tbody key={order._id}>
        <tr>
            <td>{order.order}</td>
            <td>{moment(order.date).format('DD.MM.yyyy')}</td>
            <td>{moment(order.date).format('HH:mm:ss')}</td>
            <td>{computePrice(order)} uah.</td>
            <td>
                <button className="btn btn-small grey darken-1"><i className="material-icons" onClick={() => onModal(true, order)}>open_in_new</i></button>
            </td>
        </tr>
        </tbody>)}
        </>
})
