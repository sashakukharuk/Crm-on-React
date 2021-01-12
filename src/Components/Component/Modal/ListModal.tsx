import React from "react";
import {OrderPosition} from "../../../State/order-reducer";

type PropsType = {
    numberOrder?: number
    orderPrice: number
    order: Array<OrderPosition>
    deleteOrder?: (id: string | undefined) => void
}

export const ListModal: React.FC<PropsType> = ({numberOrder, orderPrice, order, deleteOrder}) => {
    return <div className="modal-content" style={{textAlign: 'left', margin: '20px'}}>
        {numberOrder
            ? <h4 className="mb1">Order №{numberOrder}</h4>
            : <h4 className="mb1">You order</h4>
        }
        <table className="highlight">
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
                {deleteOrder && <td>
                    <i className="material-icons pointer" onClick={() => deleteOrder(o._id)}>delete</i>
                </td>}
            </tr>
            </tbody>)}
        </table>
        <div className="order-summary">
            <p>Total cost <strong>{orderPrice} uah.</strong></p>
        </div>
    </div>
}
