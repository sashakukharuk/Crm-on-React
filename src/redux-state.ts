import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {authReducer} from "./State/auth-reducer";
import {categoriesReducer} from "./State/categories-reducer";
import {positionsReducer} from "./State/positions-reducer";
import {orderReducer} from "./State/order-reducer";
import {analyticsReducer} from "./State/analytics-reducer";

let reducers = combineReducers({
    authPage: authReducer,
    categoriesPage: categoriesReducer,
    positionsPage: positionsReducer,
    orderPage: orderReducer,
    analyticsPage: analyticsReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(reducers, applyMiddleware(thunk))

export default store