import React, {useEffect} from 'react'
import h from './HistoryList/HistoryList.module.css'
import s from './HistoryFilter/HistoryFilter.module.css'
import {HistoryFilter} from "./HistoryFilter/HistoryFilter";
import {HistoryList} from "./HistoryList/HistoryList";
import {useDispatch, useSelector} from "react-redux";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import {
    FilterSelector, IsBtnCreateSelector,
    IsFilterSelector,
    IsModalSelector,
    LimitSelector,
    OffsetSelector,
    OrderSelector, OrdersSelector,
    STEPSelector
} from "../../State/Reselect/order-reselect";
import {actionsOrder, getOrdersThunk, Order} from "../../State/order-reducer";

export const HistoryPage: React.FC = () => {
    const token = useSelector(TokenSelector)
    const orders = useSelector(OrdersSelector)
    const offset = useSelector(OffsetSelector)
    const limit = useSelector(LimitSelector)
    const isModal = useSelector(IsModalSelector)
    const order = useSelector(OrderSelector)
    const isFilter = useSelector(IsFilterSelector)
    const STEP = useSelector(STEPSelector)
    const filter = useSelector(FilterSelector)
    const isSeeMore = useSelector(IsBtnCreateSelector)
    let orderPrice = 0
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrdersThunk(token, filter.start, filter.end, filter.order, offset, limit))
    }, [dispatch, token, filter.start, filter.end, filter.order, offset, limit])
    const loadMore = (limit: number) => {
        limit += STEP
        dispatch(actionsOrder.setLimit(limit))
    }
    const computePrice = (order: Order): number => {
        return order.list.reduce((total, item) => {
            // @ts-ignore
            return total += item.quantity * item.cost
        }, 0)
    }
    const onModal = (isModal: boolean, order: Order) => {
        dispatch(actionsOrder.setOrderAC(order))
        dispatch(actionsOrder.isModalAC(isModal))
    }
    const onFilter = (isFilter: boolean) => {
        dispatch(actionsOrder.isFilterAC(isFilter))
    }

    if (order.list) {
        order.list.map((p) => {
            // @ts-ignore
            return orderPrice += p.cost * p.quantity
        })
    }

    return (
        <div>
            <div className={s.pageTitle}>
                <h4>Order history</h4>
                {isFilter
                ? <button className={s.btn} onClick={() => onFilter(false)}>
                    <i>filter</i>
                </button>
                : <button className={s.btn} onClick={() => onFilter(true)}>
                    <i>filter</i>
                </button>
                }
            </div>
            {isFilter && <HistoryFilter/>}
            {orders.length !==0
            ? <div>
                <HistoryList orderPrice={orderPrice} orders={orders} order={order} isModal={isModal} computePrice={computePrice} onModal={onModal}/>
                <button className={h.btn} disabled={orders.length < STEP || isSeeMore} onClick={() => loadMore(limit)}>See more</button>
            </div>
            : <div>
                There are no orders yet.
            </div>
            }
        </div>
    )
}