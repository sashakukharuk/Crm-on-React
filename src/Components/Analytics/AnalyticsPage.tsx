import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AverageSelector, ChartSelector} from "../../State/Reselect/analytics-reselect";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import {getAnalyticsThunk} from "../../State/analytics-reducer";
import {Line} from "react-chartjs-2";
import s from './Analytics.module.css'

export const AnalyticsPage: React.FC = () => {
    const token = useSelector(TokenSelector)
    const average = useSelector(AverageSelector)
    const chart = useSelector(ChartSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAnalyticsThunk(token))
    }, [dispatch, token])

    const gainConfig: any = {
        labels: chart.map(item => item.label),
        datasets: [
            {
                label: 'Income',
                data: chart.map(item => item.gain),
                backgroundColor: '#26a69a'
            }
        ]
    }

    const orderConfig: any = {
        labels: chart.map(item => item.label),
        datasets: [
            {
                label: 'Orders',
                data: chart.map(item => item.order),
                backgroundColor: '#26a69a'
            }
        ]
    }
    return <>
        <div className="page-title">
            <h4>Analytics</h4>
        </div>

        <div className="average-price">
            <p>Average check <strong>{average} uah.</strong></p>
        </div>

        <div className={s.analyticsBlock}>
            <h4>Income</h4>
            <Line data={gainConfig}/>
        </div>

        <div className={s.analyticsBlock}>
            <h4>Order</h4>
            <Line data={orderConfig}/>
        </div>
    </>
}
