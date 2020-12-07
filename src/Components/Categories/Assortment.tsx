import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import s from './Assortment.module.css'
import {requestCategories} from "../../State/categories-reducer";
import {Category} from "./CategoryForm/Category";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import {CategoriesSelector} from "../../State/Reselect/categories-reselect";

export const Categories: React.FC = () => {
    const token = useSelector(TokenSelector)
    const categories = useSelector(CategoriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestCategories(token))
    }, [dispatch, token])
    const history = useHistory()
    const routeChange = () => {
        let path = '/categories/new'
        history.push(path)
    }
    return (
        <div>
            <div className={s.pageTitle}>
                <h4>Categories</h4>
                <button onClick={routeChange}>
                    Add categories
                </button>
            </div>
            <div className={s.collection}>
                {categories.length !==0
                    ? categories.map(u => <Category key={u._id} categoriesName={u.name} categoryId={u._id} token={token}/>)
                    : <div className={s.blockNone}>
                        You do not categories
                    </div>
                }
            </div>
        </div>
    )
}