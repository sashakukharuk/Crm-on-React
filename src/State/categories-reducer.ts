import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestCategoriesApi} from "../Components/Component/Request/requestCategories";

export type CategoriesType = {
    name: string
    imageSrc: string
    user: string
    _id: string
}

let initialState = {
    categories: [] as Array<CategoriesType>,
    category: {} as CategoriesType,
    image: null as File | null,
    isNew: true,
    isDisabledC: false
}

type InitialStateType = typeof initialState

export const categoriesReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'SK/SET/CATEGORIES': {
            return {...state, categories: actions.categories}
        }
        case 'SK/SET/CATEGORY': {
            return {...state, category: actions.category}
        }
        case 'SK/SET/NAME': {
            return {...state, category: {...state.category, name:  actions.name}}
        }
        case 'SK/SET/PHOTO': {
            return {...state, image: actions.image}
        }
        case 'SK/IS/NEW': {
            return {...state, isNew: actions.isNew}
        }
        case 'SK/IS/DISABLED': {
            return {...state, isDisabledC: actions.isDisabledC}
        }
        default: return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    setCategories: (categories: Array<CategoriesType>) => ({type: 'SK/SET/CATEGORIES', categories} as const),
    setCategory: (category: CategoriesType) => ({type: 'SK/SET/CATEGORY', category} as const),
    setName: (name: string) => ({type: 'SK/SET/NAME', name} as const),
    setPhoto: (image: File | null) => ({type: 'SK/SET/PHOTO', image} as const),
    isNewCategory: (isNew: boolean) => ({type:'SK/IS/NEW', isNew} as const),
    isDisabledCAC: (isDisabledC: boolean) => ({type:'SK/IS/DISABLED', isDisabledC} as const)
}

export const requestCategories = (token: string | null): ThunkType => async (dispatch) => {
    let data = await requestCategoriesApi.getCategories(token)
    dispatch(actions.setCategories(data))
    dispatch(actions.setCategory({name: '', imageSrc: '', user:'', _id: ''}))
    dispatch(actions.isNewCategory(true))
}

export const createCategoriesThunk = (token: string | null, image: File | null, categories: CategoriesType): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    let data = await requestCategoriesApi.postCategories(token, image, categories)
    dispatch(actions.setCategory(data))
    dispatch(actions.isDisabledCAC(false))
    dispatch(actions.isNewCategory(false))
}

export const requestByIdCategory = (token: string | null, categoryId: string): ThunkType => async (dispatch) => {
    let data = await requestCategoriesApi.getByIdCategory(token, categoryId)
    dispatch(actions.setCategory(data))
    dispatch(actions.isNewCategory(false))
}

export const updateByIdCategory = (token: string | null, image: File | null, categories: CategoriesType, categoryId: string): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    let data = await requestCategoriesApi.patchByIdCategory(token, image, categories, categoryId)
    dispatch(actions.setCategory(data))
    dispatch(actions.isDisabledCAC(false))
}

export const removeByIdCategory = (token: string | null, categoryId: string): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    await requestCategoriesApi.deleteByIdCategory(token, categoryId)
    dispatch(actions.setCategory({name: '', imageSrc: '', user:'', _id: ''}))
    dispatch(actions.isNewCategory(true))
    dispatch(actions.isDisabledCAC(false))
}