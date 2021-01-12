import {instance} from "./request";
import {PositionsType} from "../../../State/positions-reducer";

export const requestPositionsApi = {
    getByIdPositions (token: string | null, categoryId: string) {
        return instance.get(`/api/position/${categoryId}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    postPositions (token: string | null, position: PositionsType) {
        return instance.post('/api/position', position, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    patchPositions (token: string | null, position: PositionsType) {
        return instance.patch(`/api/position/${position._id}`, position, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    deletePositions (token: string | null, positionId: string | undefined) {
        return instance.delete(`/api/position/${positionId}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}
