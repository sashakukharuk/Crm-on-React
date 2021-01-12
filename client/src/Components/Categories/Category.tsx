import React from 'react'
import {NavLink} from "react-router-dom";
import {CategoriesType} from "../../State/categories-reducer";

type PropsType = {
    categories: CategoriesType[]
    getByIdCategory: (id: string) => void
}

export const Category: React.FC<PropsType> = React.memo(({categories, getByIdCategory}) => {
    return <>
        {categories.length !== 0
            ? categories.map(category => <NavLink key={category._id} className="collection-item" to={'categories/' + category._id}
                         onClick={() => getByIdCategory(category._id)}>
                    {category.name}
                </NavLink>)
            : <div className="center">
                You do not categories
            </div>
        }
    </>
})
