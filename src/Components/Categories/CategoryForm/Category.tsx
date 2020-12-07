import React from 'react'
import {requestByIdCategory} from "../../../State/categories-reducer";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import s from "../Assortment.module.css";
type PropsType = {
    token: string | null
    categoriesName: string
    categoryId: string
}

export const Category: React.FC<PropsType> = ({categoriesName,token,categoryId}) => {
    const dispatch = useDispatch()
    const getByIdCategory = () => {
        dispatch(requestByIdCategory(token, categoryId))
    }
    return (
        <div>
            <NavLink className={s.item} to={'categories/'+ categoryId} onClick={getByIdCategory}>
                {categoriesName}
            </NavLink>
        </div>
    )
}