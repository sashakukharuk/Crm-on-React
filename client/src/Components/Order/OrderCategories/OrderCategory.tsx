import React from "react";
import {NavLink} from "react-router-dom";
import {CategoriesType} from "../../../State/categories-reducer";

type PropsType = {
    categories: CategoriesType[]
    isAddProduct: () => void
}

export const OrderCategory: React.FC<PropsType> = React.memo(({categories, isAddProduct}) => {
    return <>
        {categories.map(c => <div key={c._id} className="card waves-effect pointer">
            <NavLink to={'/order/' + c._id} onClick={isAddProduct}>
                <div className="center">
                    <img className="responsive-img order-img" src={`/${c.imageSrc}`} alt=''/>
                </div>
            </NavLink>
            <div className="card-content center p10">
                <h5 className="m0">{c.name}</h5>
            </div>
        </div>)}
    </>
})
