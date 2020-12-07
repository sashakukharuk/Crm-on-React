import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import s from '../Categories/Assortment.module.css'
import {OrderModal} from "./OrderModal";
import {actionsOrder, createOrderThunk} from "../../State/order-reducer";
import {
    IsAddProductSelector,
    IsBtnCompleteSelector, IsBtnCreateSelector,
    IsModalSelector,
    OrderPositionSelector,
    OrderSelector
} from "../../State/Reselect/order-reselect";
import {TokenSelector} from "../../State/Reselect/auth-reselect";
import m from '../Categories/CategoryForm/PositionsForm/PositionForm.module.css'


export const OrderPage: React.FC = () => {
    const token = useSelector(TokenSelector)
    const isAddProduct = useSelector(IsAddProductSelector)
    const isModal = useSelector(IsModalSelector)
    const orderPosition = useSelector(OrderPositionSelector)
    const order = useSelector(OrderSelector)
    const isBtnComplete = useSelector(IsBtnCompleteSelector)
    const isBtnCreate = useSelector(IsBtnCreateSelector)
    let orderPrice = 0
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionsOrder.setOrder(orderPosition))
    }, [dispatch, orderPosition])
    if (orderPosition.length === 0) {
        dispatch(actionsOrder.isBtnCompleteAC(true))
        dispatch(actionsOrder.isModalAC(false))
    }
    const toggleIsRoot = () => {
        dispatch(actionsOrder.addProduct(false))
    }
    const orderModalChange = (isModal: boolean) => {
        dispatch(actionsOrder.isModalAC(isModal))
    }

    const deleteOrder = (id: string | undefined) => {
        dispatch(actionsOrder.deleteOrderAC(id))
    }
    const onOrderClick = () => {
        dispatch(createOrderThunk(token, order))
    }

    orderPosition.map((p) => {
        // @ts-ignore
        return orderPrice += p.cost * p.quantity
    })

    return (
        <div>
            <div className={s.pageTitle}>
                {!isAddProduct
                    ? <h4>Order</h4>
                    : <h4>
                        <NavLink onClick={toggleIsRoot} to='/order/'>Order</NavLink>
                        <i>/</i>
                        Add product
                    </h4>
                }
                <button className={isBtnComplete ? s.active : ''} disabled={isBtnComplete} onClick={() => orderModalChange(true)}>
                    Complete
                </button>
            </div>
            {isModal && <div>
                <div className={m.modalOverlay} onClick={() => orderModalChange(false)}/>
                <OrderModal
                    orderPrice={orderPrice}
                    orderPosition={orderPosition}
                    isBtnCreate={isBtnCreate}
                    orderModalChange={orderModalChange}
                    deleteOrder={deleteOrder}
                    onOrderClick={onOrderClick}
                />
            </div>}
        </div>
    )
}
