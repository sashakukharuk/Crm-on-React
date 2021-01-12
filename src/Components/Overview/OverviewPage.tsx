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
    return <>
        <div className="page-title">
            <h4>
                Yesterday`s review (yesterday | {moment(yesterday).format('DD.MM.yyyy')})
            </h4>
        </div>

        <div className="row">
            <div className="col s12 l6">
                <div className="card light-blue lighten-2 white-text">
                    <div className="card-content">
                        <span className="card-title">Income:</span>
                        <h3>{gain.yesterday} uah.</h3>
                        <h3 className="green-text text-darken-2 m0 mb1">
                            <i className="material-icons">{gain.isHigher ? 'arrow_upward' : 'arrow_downward'}</i>
                            {gain.parecent}%
                        </h3>
                        <p>
                            Income your business yesterday on {gain.parecent}%
                            {gain.isHigher ? 'above' : ' lower'} average: {gain.compare} uah. a day
                        </p>
                    </div>
                </div>
            </div>

            <div className="col s12 l6">
                <div className="card orange lighten-2 white-text">
                    <div className="card-content">
                        <span className="card-title">Orders:</span>
                        <h3>{ordersA.yesterday} {ordersA.yesterday > 1 ? 'orders' : 'order'}</h3>
                        <h3 className="red-text m0 mb1">
                            <i className="material-icons">{ordersA.isHigher ? 'arrow_upward' : 'arrow_downward'}</i>
                            {ordersA.parecent}%
                        </h3>
                        <p>
                            Order number yesterday on {ordersA.parecent}% lower average value: {ordersA.yesterday}
                            {ordersA.yesterday > 1 ? 'orders' : ' order'} a day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
