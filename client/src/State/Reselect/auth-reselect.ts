import {AppStateType} from '../../redux-state'

// export const MessageSelector = (state: AppStateType) => {
//     return state.authPage.message
// }

export const TokenSelector = (state: AppStateType) => {
    return state.authPage.token
}

export const IsDisabledAuthSelector = (state: AppStateType) => {
    return state.authPage.isDisabled
}