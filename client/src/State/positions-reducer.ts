import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestPositionsApi} from "../Components/Component/Request/requestPositions";

export type PositionsType = {
    name: string
    cost: number
    user?: string
    category?: string
    _id?: string
    quantity?: number
    positionId?: string | undefined
}

let initialState = {
    positions: null as null | Array<PositionsType>,
    position: {} as PositionsType,
    isForm: false,
    isUpdate: false,
    isDisabled: false,
    removePosition: [] as Array<string | undefined>,
    isRoot: false
}

type InitialStateType = typeof initialState

export const positionsReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'SK/SET/POSITIONS': {
            return {...state, positions: actions.positions}
        }
        case 'SK/SET/POSITION': {
            return {...state, position: actions.position}
        }
        case 'SK/IS/FORM': {
            return {...state, isForm: actions.isForm}
        }
        case 'SK/IS/UPDATE': {
            return {...state, isUpdate: actions.isUpdate}
        }
        case 'SK/IS/DISABLED': {
            return {...state, isDisabled: actions.isDisabled}
        }
        case 'SK/REMOVE/POSITION': {
            return {
                ...state, removePosition: actions.removePosition
                    ? [...state.removePosition, actions.positionId]
                    : state.removePosition.filter(id => id !== actions.positionId)
            }
        }
        case 'SK/IS/ROOT': {
            return {...state, isRoot: actions.isRoot}
        }
        case 'SK/SET/QUANTITY': {
            return {
                ...state,
                // @ts-ignore
                positions: state.positions.map(p => {
                    if (p._id === actions.id) {
                        return {...p, quantity: actions.quantity}
                    }
                    return p
                })
            }
        }
        default: return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    setPositions: (positions: Array<PositionsType>) => ({type: 'SK/SET/POSITIONS', positions} as const),
    setPosition: (position: PositionsType) => ({type: 'SK/SET/POSITION', position} as const),
    isFormAC: (isForm: boolean) => ({type: 'SK/IS/FORM', isForm} as const),
    isUpaDate: (isUpdate: boolean) => ({type: 'SK/IS/UPDATE', isUpdate} as const),
    isDisabledAC: (isDisabled: boolean) => ({type: 'SK/IS/DISABLED', isDisabled} as const),
    removePositionAC: (removePosition: boolean, positionId: string | undefined) => ({type: 'SK/REMOVE/POSITION', removePosition, positionId} as const),
    isRootAC: (isRoot: boolean) => ({type: 'SK/IS/ROOT', isRoot} as const),
    setQuantity: (id: string | undefined, quantity: number) => ({type: 'SK/SET/QUANTITY', id, quantity} as const)
}

export const getPositionsThunk = (token: string | null, categoryId: string): ThunkType => async (dispatch) => {
    dispatch(actions.isRootAC(true))
    let data = await requestPositionsApi.getByIdPositions(token, categoryId)
    dispatch(actions.setPositions(data))
}

export const createPositionsThunk = (token: string | null, position: PositionsType): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    let data = await requestPositionsApi.postPositions(token, position)
    dispatch(actions.setPosition(data))
    dispatch(actions.isDisabledAC(false))
}

export const updatePositionsThunk = (token: string | null, position: PositionsType): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    let data = await requestPositionsApi.patchPositions(token, position)
    dispatch(actions.setPosition(data))
    dispatch(actions.isDisabledAC(false))
}

export const removePositionsThunk = (token: string | null, positionId: string | undefined): ThunkType => async (dispatch) => {
    dispatch(actions.removePositionAC(true, positionId))
    await requestPositionsApi.deletePositions(token, positionId)
    dispatch(actions.removePositionAC(false, positionId))
}
