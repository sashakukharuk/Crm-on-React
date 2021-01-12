import {AppStateType} from '../../redux-state'

export const IsModalSelector = (state: AppStateType) => {
    return state.orderPage.isModal
}

export const IsFilterSelector = (state: AppStateType) => {
    return state.orderPage.isFilter
}

export const OrderPositionSelector = (state: AppStateType) => {
    return state.orderPage.orderPosition
}

export const OrderSelector = (state: AppStateType) => {
    return state.orderPage.order
}

export const IsBtnCompleteSelector = (state: AppStateType) => {
    return state.orderPage.isBtnComplete
}

export const IsBtnCreateSelector = (state: AppStateType) => {
    return state.orderPage.isBtnCreate
}

export const IsAddProductSelector = (state: AppStateType) => {
    return state.orderPage.isAddProduct
}

export const OrdersSelector = (state: AppStateType) => {
    return state.orderPage.orders
}
export const LimitSelector = (state: AppStateType) => {
    return state.orderPage.limit
}
export const OffsetSelector = (state: AppStateType) => {
    return state.orderPage.offset
}

export const STEPSelector = (state: AppStateType) => {
    return state.orderPage.STEP
}

export const FilterSelector = (state: AppStateType) => {
    return state.orderPage.filter
}