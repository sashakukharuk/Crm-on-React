import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {actions, requestByIdCategory, requestCategories} from "../../State/categories-reducer";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import {CategoriesSelector} from "../../State/Reselect/categories-reselect";
import {Category} from "./Category";
import {Preloader} from "../Component/Preloader/Preloader";

export const Categories: React.FC = () => {
    const token = useSelector(TokenSelector)
    const categories = useSelector(CategoriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestCategories(token))
    }, [dispatch, token])
    const history = useHistory()
    const routeChange = () => {
        dispatch(actions.isNewCategory(true))
        let path = '/categories/new'
        history.push(path)
    }
    const getByIdCategory = (categoryId: string) => {
        dispatch(requestByIdCategory(token, categoryId))
    }

    return <>
        <div className="page-title">
            <h4>Categories</h4>
            <button className="waves-effect waves-light btn grey darken-1" onClick={routeChange}>Add categories
            </button>
        </div>
        {!categories ? <Preloader/>
            : categories.length !== 0
                ? <div className="row">
                    <div className="col s12">
                        <div className="collection">
                            <Category categories={categories} getByIdCategory={getByIdCategory}/>
                        </div>
                    </div>
                </div>
                : <div className="center">
                    You do not categories
                </div>}
    </>
}
