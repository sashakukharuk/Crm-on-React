import React from 'react'
import {PositionsType} from "../../../State/positions-reducer";
import s from '../../Component/Modal/ListModal.module.css'
import addP from './OrderPosition.module.css'
type PropsType = {
    positions: Array<PositionsType>
    onQuantityChange: (id: string | undefined, quantity: number) => void
    submitOrder: (name: string, cost: number, quantity: number, _id: string | undefined) => void
}
export const OrderPosition: React.FC<PropsType> = React.memo(({positions, onQuantityChange, submitOrder}) => {

    return <>
        <table className="highlight">
            <thead>
            <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th/>
            </tr>
            </thead>

            {positions.map(p => <tbody key={p._id}>
            <tr>
                <td>{p.name}</td>
                <td>{p.cost} uah.</td>
                <td>
                    <div className="input-field inline order-position-input">
                        <input type="number" value={p.quantity ? p.quantity : '1'} min='1' onChange={(e) => onQuantityChange(p._id, +e.currentTarget.value)}/>
                    </div>
                </td>
                <td>
                    <button className="btn waves-effect wavers-light btn-small" onClick={() => submitOrder(p.name, p.cost, p.quantity ? p.quantity : 1, p._id)}>Add</button>
                </td>
            </tr>
            </tbody>)}
        </table>
    </>
})
