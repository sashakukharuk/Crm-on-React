import React, {useEffect} from 'react'
import './App.css'
import './Components/Component/Style/content.css'
import {LoginPage} from "./Components/Login/LoginPage";
import {RegisterPage} from "./Components/Register/RegisterPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Sidebar} from "./Components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {Categories} from "./Components/Categories/Assortment";
import {getTokenThunk} from "./State/auth-reducer";
import {CategoryForm} from "./Components/Categories/CategoryForm/CategoryForm";
import {TokenSelector} from "./State/Reselect/auth-reselect";
import {OrderPage} from "./Components/Order/Order";
import {OrderCategories} from "./Components/Order/OrderCategories/OrderCategories";
import {OrderPositions} from "./Components/Order/OrderPositions/OrderPositions";
import {HistoryPage} from "./Components/History/HistoryPage";
import {AnalyticsPage} from "./Components/Analytics/AnalyticsPage";
import {OverviewPage} from "./Components/Overview/OverviewPage";

const App: React.FC = () => {
    const token = useSelector(TokenSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTokenThunk())
    }, [dispatch, token])

    return (
        <BrowserRouter>
            {token
                ? <div className='app-wrapper'>
                    <Sidebar/>
                    <div className='content'>
                        <Route path='/overview' render={() => <OverviewPage/>}/>
                        <Route path='/analytics' render={() => <AnalyticsPage/>}/>
                        <Route path='/history' render={() => <HistoryPage/>}/>
                        <Route path='/order' render={() => <OrderPage/>}/>
                        <Route exact path='/order/' render={() => <OrderCategories/>}/>
                        <Route path='/order/:id' render={() => <OrderPositions/>}/>
                        <Route exact path='/categories' render={() => <Categories/>}/>
                        <Route path='/categories/new!' render={() => <CategoryForm/>}/>
                        <Route path='/categories/:id' render={() => <CategoryForm/>}/>
                    </div>
                </div>
                : <div>
                    <Route path='/login' render={() => <LoginPage/>}/>
                    <Route path='/register' render={() => <RegisterPage/>}/>
                </div>
            }
        </BrowserRouter>
    )
}

export default App;
