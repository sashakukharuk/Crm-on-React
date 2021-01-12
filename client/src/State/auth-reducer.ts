import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestAuth} from "../Components/Component/Request/requestAuth";
import {MaterialService} from "../Components/Component/Material/Material";

export type User = {
    email: string
    password: string
}

let initialState = {
    token: null as string | null,
    isDisabled: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SK/USER/AUTH': {
            return {...state, token: action.token}
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
    isDisabledAC: (isDisabled: boolean) => ({type: 'AUTH/IS/DISABLED', isDisabled} as const)
}

export const loginThunk = (user: User): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    await requestAuth.postLogin(user).then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(actions.loginUser(res.data.token))
    }).catch(error => {
        MaterialService.toast(error.response.data.message)
    })
    dispatch(actions.isDisabledAC(false))
}

export const registerThunk = (user: User): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledAC(true))
    await requestAuth.postRegister(user).catch(error => {
        MaterialService.toast(error.response.data.message)
    })
    dispatch(actions.isDisabledAC(false))
}
