import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestOrderApi} from "../Components/Component/Request/requestOrder";

export type Filter = {
    order: number
    start: Date
    end: Date
}

export type OrderPosition = {
    name: string
    cost: number
    user?: string
    category?: string
    _id?: string | undefined
    quantity?: number
}

export type Order = {
    date?: Date | undefined
    order?: number
    user?: string
    list: OrderPosition[]
    _id?: string
}

let initialState = {
    orderPosition: [] as Array<OrderPosition>,
    order: {} as Order,
    orders: [] as Array<Order>,
    isModal: false,
    isBtnComplete: true,
    isBtnCreate: false,
    isFilter: false,
    isAddProduct: false,
    STEP: 5,
    limit: 5,
    offset: 0,
    filter: {order: '', start: '', end: ''} as unknown as Filter
}

type InitialStateType = typeof initialState

export const orderReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SK/SET/ORDER/POSITION': {
            let isOrder = state.orderPosition.find(p => p._id === action.orderPosition._id)

            return {
                ...state, orderPosition: state.orderPosition.length !==0
                    ? isOrder
                        ? state.orderPosition.map((o) => {
                                if (o._id === action.orderPosition._id) {
                                    return {...o, quantity: action.orderPosition.quantity}
                                }
                                return o
                            })
                        : [...state.orderPosition, action.orderPosition]
                    : [...state.orderPosition, action.orderPosition]
            }
        }
        case 'SK/SET/ORDER': {
            return {...state, order: action.order}
        }
        case 'SK/SET/ORDER/LIST': {
            return {...state, order: {...state.orderPosition, list: action.orderPosition}}
        }
        case 'SK/IS/MODAL': {
            return {...state, isModal: action.isModal}
        }
        case 'SK/DELETE/ORDER': {
            return {...state, orderPosition: state.orderPosition.filter(p => p._id!== action.id)}
        }
        case 'SK/DELETE/ORDERS': {
            return {...state, orderPosition: action.orderPosition}
        }
        case 'SK/IS/BTN/COMPLETE': {
            return {...state, isBtnComplete: action.isBtnComplete}
        }
        case 'SK/IS/BTN/CREATE': {
            return {...state, isBtnCreate: action.isBtnCreate}
        }
        case 'SK/SET/ORDERS': {
            return {...state, orders: action.orders}
        }
        case 'SK/SET/OFFSET': {
            return {...state, limit: action.limit}
        }
        case 'SK/IS/FILTER': {
            return {...state, isFilter: action.isFilter}
        }
        case 'SK/SET/FILTER': {
            return {...state, filter: action.filter}
        }
        case 'ORDER/IS/ADD/PRODUCT': {
            return {...state, isAddProduct: action.isAddProduct}
        }
        default: return state
    }
}

type ActionType = InferActionsTypes<typeof actionsOrder>
type ThunkType = BaseThunkType<ActionType>

export const actionsOrder = {
    setOrderPosition: (orderPosition: OrderPosition) => ({type: 'SK/SET/ORDER/POSITION', orderPosition} as const),
    setOrderAC: (order: Order) => ({type: 'SK/SET/ORDER', order} as const),
    setOrder: (orderPosition: Array<OrderPosition>) => ({type: 'SK/SET/ORDER/LIST', orderPosition} as const),
    setOrders: (orders: Array<Order>) => ({type: 'SK/SET/ORDERS', orders} as const),
    isModalAC: (isModal: boolean) => ({type: 'SK/IS/MODAL', isModal} as const),
    isFilterAC: (isFilter: boolean) => ({type: 'SK/IS/FILTER', isFilter} as const),
    setFilter: (filter: Filter) => ({type: 'SK/SET/FILTER', filter} as const),
    isBtnCompleteAC: (isBtnComplete: boolean) => ({type: 'SK/IS/BTN/COMPLETE', isBtnComplete} as const),
    isBtnAC: (isBtnCreate: boolean) => ({type: 'SK/IS/BTN/CREATE', isBtnCreate} as const),
    deleteOrderAC: (id: string | undefined) => ({type: 'SK/DELETE/ORDER', id} as const),
    deleteOrderSAC: (orderPosition: Array<OrderPosition>) => ({type: 'SK/DELETE/ORDERS', orderPosition} as const),
    setLimit: (limit: number) => ({type: 'SK/SET/OFFSET', limit} as const),
    addProduct: (isAddProduct: boolean) => ({type: 'ORDER/IS/ADD/PRODUCT', isAddProduct} as const)
}

export const createOrderThunk = (token: string | null, order: Order): ThunkType => async (dispatch) => {
    dispatch(actionsOrder.isBtnAC(true))
    await requestOrderApi.createOrder(token, order)
    dispatch(actionsOrder.deleteOrderSAC([]))
    dispatch(actionsOrder.isBtnCompleteAC(true))
    dispatch(actionsOrder.isModalAC(false))
    dispatch(actionsOrder.isBtnAC(false))
}

export const getOrdersThunk = (token: string | null, start: Date, end: Date, order: number, offset: number, limit: number): ThunkType => async (dispatch) => {
    dispatch(actionsOrder.isBtnAC(true))
    let data = await requestOrderApi.getOrder(token, start, end, order, offset, limit)
    dispatch(actionsOrder.setOrders(data))
    dispatch(actionsOrder.isBtnAC(false))
}
