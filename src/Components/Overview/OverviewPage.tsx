import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GainSelector, OrdersASelector} from "../../State/Reselect/analytics-reselect";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import {getOverviewThunk} from "../../State/analytics-reducer";
import moment from "moment";
import s from './Overview.module.css'

export const OverviewPage: React.FC = () => {
    const token = useSelector(TokenSelector)
    const gain = useSelector(GainSelector)
    const ordersA = useSelector(OrdersASelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOverviewThunk(token))
    }, [dispatch, token])
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
        <div>
            <div className={s.pageTitle}>
                <h4>
                    Обзор за вчера (yesterday | {moment(yesterday).format('DD.MM.yyyy')})
                </h4>
            </div>

            <div className={s.overviewBlock}>
                <div className={s.block} style={{backgroundColor: 'aqua'}}>
                    <span>Income:</span>
                    <h4>{gain.yesterday} uah.</h4>
                    <h4 style={gain.isHigher ? {color: 'green'} : {color: 'red'}}>
                        <i>{gain.isHigher ? 'up' : 'down'}</i>
                        {gain.parecent}%
                    </h4>
                    <p>
                        Income your business yesterday on {gain.parecent}%
                        {gain.isHigher ? 'above' : ' lower'} average: {gain.compare} uah. a day
                    </p>
                </div>
                <div className={s.block} style={{backgroundColor: 'yellowgreen'}}>
                    <span>Orders:</span>
                    <h4>{ordersA.yesterday} {ordersA.yesterday > 1 ? 'orders' : 'order'}</h4>
                    <h4 style={ordersA.isHigher ? {color: 'green'} : {color: 'red'}}>
                        <i>{ordersA.isHigher ? 'up' : 'down'}</i>
                        {ordersA.parecent}%
                    </h4>
                    <p>Order number yesterday on {ordersA.parecent}% lower average value: {ordersA.yesterday}
                        {ordersA.yesterday > 1 ? 'orders': ' order'} a day</p>
                </div>
            </div>
        </div>
    )
}