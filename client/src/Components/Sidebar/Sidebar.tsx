import React from 'react'
import s from './Sidbar.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {actions} from "../../State/auth-reducer";

export const Sidebar = () => {
    const dispatch = useDispatch()
    return <ul className="sidenav sidenav-fixed a-sidenav">
        <h4>Newborn</h4>
        <li className="bold"><NavLink to='/overview' className="waves-effect waves-orange" activeClassName={s.active}>Review</NavLink></li>
        <li className="bold"><NavLink to='/analytics' className="waves-effect waves-orange" activeClassName={s.active}>Analytics</NavLink></li>
        <li className="bold"><NavLink to='/history' className="waves-effect waves-orange" activeClassName={s.active}>History</NavLink></li>
        <li className="bold"><NavLink to='/order' className="waves-effect waves-orange" activeClassName={s.active}>Add order</NavLink></li>
        <li className="bold "><NavLink to='/categories' className="waves-effect waves-orange" activeClassName={s.active}>Assortment</NavLink></li>
        <li className="bold last">
            <NavLink to='/login' onClick={() => {
                localStorage.removeItem('token')
                dispatch(actions.loginUser(''))
            }} className="waves-effect waves-orange" activeClassName={s.active}>Log out</NavLink>
        </li>
    </ul>
}
