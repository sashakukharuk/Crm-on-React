import React from 'react'
import s from './Sidbar.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeTokenThunk} from "../../State/auth-reducer";

export const Sidebar = () => {
    const dispatch = useDispatch()
    const clearToken = () => {
        dispatch(removeTokenThunk())
    }
    return (
        <div className={s.sidenav}>
            <div className={s.header}>
                <h4>Newborn</h4>
            </div>
            <div className={s.item}>
                <NavLink to='/overview' activeClassName={s.active}>Review</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/analytics' activeClassName={s.active}>Analytics</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/history' activeClassName={s.active}>History</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/order' activeClassName={s.active}>Add order</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/categories' activeClassName={s.active}>Assortment</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/login' onClick={clearToken} activeClassName={s.active}>Check out</NavLink>
                {/*<button onClick={clearToken}>*/}
                {/*    Check out*/}
                {/*</button>*/}
            </div>
        </div>
    )
}
