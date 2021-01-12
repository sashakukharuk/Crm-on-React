import React, {useEffect} from 'react'
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
import {actionsOrder, getOrdersThunk} from "../../State/order-reducer";
import {Preloader} from "../Component/Preloader/Preloader";

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

    const onFilter = () => {
        dispatch(actionsOrder.isFilterAC(!isFilter))
    }

    if (order.list) {
        order.list.map((p) => {
            // @ts-ignore
            return orderPrice += p.cost * p.quantity
        })
    }

    return <>
        <div className="page-title">
            <h4>Order history</h4>
            <button className="btn btn-small js-filter tooltipped" onClick={onFilter} data-tooltip="Открыть фильтр">
                <i className="material-icons">filter_list</i>
            </button>
        </div>

        {isFilter && <HistoryFilter/>}

        {!orders ? <Preloader/>
        : orders.length !== 0
            ? <div>
                <HistoryList
                    orderPrice={orderPrice}
                    orders={orders}
                    order={order}
                    isModal={isModal}
                />

                <div className="center mb2">
                    <button
                        className="btn waves-effect grey darken-1 btn-small"
                        disabled={orders.length < STEP || isSeeMore}
                        onClick={() => loadMore(limit)}
                    >
                        See more
                    </button>
                </div>
            </div>
            : <div className="center">
                There are no orders yet.
            </div>
        }
    </>
}
