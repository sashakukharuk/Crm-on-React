import {AppStateType} from "../../redux-state";

export const AverageSelector = (state: AppStateType) => {
    return state.analyticsPage.average
}
export const ChartSelector = (state: AppStateType) => {
    return state.analyticsPage.chart
}
export const GainSelector = (state: AppStateType) => {
    return state.analyticsPage.gain
}
export const OrdersASelector = (state: AppStateType) => {
    return state.analyticsPage.ordersA
}