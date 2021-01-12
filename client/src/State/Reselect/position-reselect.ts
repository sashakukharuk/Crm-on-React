import {AppStateType} from '../../redux-state'


export const PositionsSelector = (state: AppStateType) => {
    return state.positionsPage.positions
}

export const IsFormSelector = (state: AppStateType) => {
    return state.positionsPage.isForm
}

export const IsUpDateSelector = (state: AppStateType) => {
    return state.positionsPage.isUpdate
}

export const PositionSelector = (state: AppStateType) => {
    return state.positionsPage.position
}

export const IsDisabledSelector = (state: AppStateType) => {
    return state.positionsPage.isDisabled
}

export const RemovePositionSelector = (state: AppStateType) => {
    return state.positionsPage.removePosition
}

export const IsRootSelector = (state: AppStateType) => {
    return state.positionsPage.isRoot
}
