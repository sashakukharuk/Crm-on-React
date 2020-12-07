import {instance} from "./request";
import {Order} from "../../../State/order-reducer";

export const requestOrderApi = {
    createOrder (token: string | null, order: Order) {
        debugger
        return instance.post('order', order, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    getOrder (token: string | null, start: Date, end: Date, order: number, offset: number, limit: number) {
        return instance.get(`order?start=${start}&end=${end}&order=${order}&offset=${offset}&limit=${limit}`,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}