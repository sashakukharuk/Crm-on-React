import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './OrderCategories.module.css'
import {requestCategories} from "../../../State/categories-reducer";
import {TokenSelector} from "../../../State/Reselect/auth-reselect";
import {CategoriesSelector} from "../../../State/Reselect/categories-reselect";
import {NavLink} from "react-router-dom";
import {actionsOrder} from "../../../State/order-reducer";

export const OrderCategories: React.FC = () => {
    const token = useSelector(TokenSelector)
    const categories = useSelector(CategoriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionsOrder.addProduct(false))
        dispatch(requestCategories(token))
    }, [dispatch, token])
    const isAddProduct = () => {
        dispatch(actionsOrder.addProduct(true))
    }
    return (
        <div className={s.frow}>
            {categories.length !== 0
                ? categories.map(c => <div key={c._id} className={s.card}>
                    <div className={s.center}>
                        <NavLink to={'/order/' + c._id} onClick={isAddProduct}>
                            <img src={c.imageSrc ? `http://localhost:5000/${c.imageSrc}` : ''} alt=''/>
                        </NavLink>
                    </div>
                    <div className={s.content}>
                        <h5>{c.name}</h5>
                    </div>
                </div>)
                : <div className="center">
                    There are no categories yet.
                </div>
            }
        </div>

    )
}