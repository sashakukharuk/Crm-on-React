import {requestAnalyticsAPI} from "../Components/Component/Request/requestAnalytics";
import {BaseThunkType, InferActionsTypes} from "../redux-state";


export type AnalyticsChartItem = {
    gain: number
    order: number
    label: string
}

export type OverviewPageItem = {
    parecent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

let initialState = {
    average: 0,
    chart: [] as Array<AnalyticsChartItem>,
    gain: {} as OverviewPageItem,
    ordersA: {} as OverviewPageItem
}

type InitialStateType = typeof initialState

export const analyticsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AN/SET/AVERAGE': {
            return {...state, average: action.average}
        }
        case 'AN/SET/CHART': {
            return {...state, chart: action.chart}
        }
        case 'AN/SET/GAIN': {
            return {...state, gain: action.gain}
        }
        case 'AN/SET/ORDERS': {
            return {...state, ordersA: action.ordersA}
        }
        default: return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    setAverage: (average: number) => ({type: 'AN/SET/AVERAGE', average} as const),
    setChart: (chart: Array<AnalyticsChartItem>) => ({type: 'AN/SET/CHART', chart} as const),
    setGain: (gain: OverviewPageItem) => ({type: 'AN/SET/GAIN', gain} as const),
    setOrders: (ordersA: OverviewPageItem) => ({type: 'AN/SET/ORDERS', ordersA} as const)
}

export const getAnalyticsThunk = (token: string | null): ThunkType => async (dispatch) => {
    let data = await requestAnalyticsAPI.getAnalytics(token)
    dispatch(actions.setAverage(data.average))
    dispatch(actions.setChart(data.chart))
}

export const getOverviewThunk = (token: string | null): ThunkType => async (dispatch) => {
    let data = await requestAnalyticsAPI.getOverview(token)
    dispatch(actions.setGain(data.gain))
    dispatch(actions.setOrders(data.orders))
}