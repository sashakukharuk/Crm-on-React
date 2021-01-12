import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestCategories} from "../../../State/categories-reducer";
import {TokenSelector} from "../../../State/Reselect/auth-reselect";
import {CategoriesSelector} from "../../../State/Reselect/categories-reselect";
import {actionsOrder} from "../../../State/order-reducer";
import {OrderCategory} from "./OrderCategory";
import {Preloader} from "../../Component/Preloader/Preloader";

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

    if (!categories) {
        return <Preloader/>
    }

    return <div className="frow order-row">
        {categories.length !== 0
            ? <OrderCategory categories={categories} isAddProduct={isAddProduct}/>
            : <div className="center" style={{width: "100%", textAlign: "center"}}>
                There are no categories yet.
            </div>
        }
    </div>
}
