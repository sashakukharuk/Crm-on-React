import {AppStateType} from '../../redux-state'

export const ImageSelector = (state: AppStateType) => {
    return state.categoriesPage.image
}

export const IsNewSelector = (state: AppStateType) => {
    return state.categoriesPage.isNew
}

export const IsDisabledCSelector = (state: AppStateType) => {
    return state.categoriesPage.isDisabledC
}

export const CategorySelector = (state: AppStateType) => {
    return state.categoriesPage.category
}

export const CategoriesSelector = (state: AppStateType) => {
    return state.categoriesPage.categories
}

// export const categoriesData = createSelector(CategoriesSelector,
//     (categories) => {
//         return categories.filter(c => true);
// })
