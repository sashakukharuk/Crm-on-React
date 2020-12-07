import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestAuth} from "../Components/Component/Request/requestAuth";


export type User = {
    email: string
    password: string
}

let initialState = {
    token: null as string | null,
    message: null as string | null,
    isDisabled: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SK/USER/AUTH': {
            return {...state, token: action.token}
        }
        case 'SK/MESSAGE/AUTH': {
            return {...state, message: action.message}
        }
        case 'AUTH/IS/DISABLED': {
            return {...state, isDisabled: action.isDisabled}
        }
        default : return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {
    loginUser: (token: string | null) => ({type: 'SK/USER/AUTH', token} as const),
    setMessage: (message: string) => ({type: 'SK/MESSAGE/AUTH', message} as const),
    isDisabledAC: (isDisabled: boolean) => ({type: 'AUTH/IS/DISABLED', isDisabled} as const)
}

export const loginThunk = (user: User): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    let data = await requestAuth.postLogin(user)
    dispatch(actions.loginUser(data.token))
    if(data.message) {
        dispatch(actions.setMessage(data.message))
    }
    dispatch(actions.isDisabledAC(false))
}

export const registerThunk = (user: User): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    let data = await requestAuth.postRegister(user)
    if(data.message) {
        dispatch(actions.setMessage(data.message))
    }
    dispatch(actions.isDisabledAC(false))
}

export const getTokenThunk = (): ThunkType => async (dispatch) => {
    let data = await requestAuth.getToken()
    dispatch(actions.loginUser(data))
}

export const removeTokenThunk = (): ThunkType => async (dispatch) => {
    let data = await requestAuth.removeToken()
    dispatch(actions.loginUser(data))
}