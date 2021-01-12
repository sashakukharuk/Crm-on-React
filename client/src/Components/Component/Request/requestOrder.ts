import {instance} from "./request";
import {Order} from "../../../State/order-reducer";

export const requestOrderApi = {
    createOrder (token: string | null, order: Order) {
        debugger
        return instance.post('/api/order', order, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    getOrder(token: string | null, start: Date | string, end: Date | string, order: number, offset: number, limit: number) {
        return instance.get(`/api/order?start=${start}&end=${end}&order=${order}&offset=${offset}&limit=${limit}`,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}
