import React from 'react'
import {PositionsType} from "../../../State/positions-reducer";
import s from '../../Component/Modal/ListModal.module.css'
import addP from './OrderPosition.module.css'
type PropsType = {
    positions: Array<PositionsType>
    onQuantityChange: (id: string | undefined, quantity: number) => void
    submitOrder: (name: string, cost: number, quantity: number, _id: string | undefined) => void
}
export const OrderPosition: React.FC<PropsType> = ({positions, onQuantityChange, submitOrder}) => {
    return <div>
        <table className={s.table}>
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
                    <div className={addP.field}>
                        <input type="number" value={p.quantity ? p.quantity : '1'} min='1' onChange={(e) => onQuantityChange(p._id, +e.currentTarget.value)}/>
                    </div>
                </td>
                <td>
                    <button className={addP.btn} onClick={() => submitOrder(p.name, p.cost, p.quantity ? p.quantity : 1, p._id)}>Add</button>
                </td>
            </tr>
            </tbody>)}
        </table>
    </div>
}