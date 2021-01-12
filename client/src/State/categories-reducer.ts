import {BaseThunkType, InferActionsTypes} from "../redux-state";
import {requestCategoriesApi} from "../Components/Component/Request/requestCategories";
import {MaterialService} from "../Components/Component/Material/Material";

export type CategoriesType = {
    name: string
    imageSrc: string
    user: string
    _id: string
}

let initialState = {
    categories: null as null | Array<CategoriesType>,
    category: {} as CategoriesType,
    image: null as File | null,
    imagePreview: null as null | string,
    isNew: false,
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
        case 'SK/SET/IMAGE_PREVIEW': {
            return {...state, imagePreview: actions.imagePreview}
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
    setImagePreview: (imagePreview: null | string) => ({type: 'SK/SET/IMAGE_PREVIEW', imagePreview} as const),
    isNewCategory: (isNew: boolean) => ({type:'SK/IS/NEW', isNew} as const),
    isDisabledCAC: (isDisabledC: boolean) => ({type:'SK/IS/DISABLED', isDisabledC} as const)
}

export const requestCategories = (token: string | null): ThunkType => async (dispatch) => {
    let data = await requestCategoriesApi.getCategories(token)
    dispatch(actions.setCategories(data))
    dispatch(actions.setCategory({name: '', imageSrc: '', user:'', _id: ''}))
    dispatch(actions.isNewCategory(false))
}

export const createCategoriesThunk = (token: string | null, image: File | null, categories: CategoriesType): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    await requestCategoriesApi.postCategories(token, image, categories).then(res => {
        dispatch(actions.setCategory(res.data))
        dispatch(actions.setImagePreview(null))
        dispatch(actions.setPhoto(null))
        dispatch(actions.isDisabledCAC(false))
        dispatch(actions.isNewCategory(false))
        MaterialService.toast('The category was added')
    }).catch(error => {
        MaterialService.toast(error.response.data.message)
        dispatch(actions.isDisabledCAC(false))
        dispatch(actions.setImagePreview(null))
        dispatch(actions.setPhoto(null))
    })

}

export const requestByIdCategory = (token: string | null, categoryId: string): ThunkType => async (dispatch) => {
    await requestCategoriesApi.getByIdCategory(token, categoryId).then(res => {
        dispatch(actions.setCategory(res.data))
        MaterialService.updateTextInputs()
    }).catch(error => {
        MaterialService.toast(error.response.data.message)
    })
}

export const updateByIdCategory = (token: string | null, image: File | null, categories: CategoriesType, categoryId: string): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    await requestCategoriesApi.patchByIdCategory(token, image, categories, categoryId).then(res => {
        dispatch(actions.setCategory(res.data))
        dispatch(actions.setImagePreview(null))
        dispatch(actions.setPhoto(null))
        dispatch(actions.isDisabledCAC(false))
        MaterialService.toast('Changes save')
    }).catch(error => {
        MaterialService.toast(error.response.data.message)
        dispatch(actions.setImagePreview(null))
        dispatch(actions.setPhoto(null))
        dispatch(actions.isDisabledCAC(false))
    })

}

export const removeByIdCategory = (token: string | null, categoryId: string): ThunkType => async (dispatch) => {
    dispatch(actions.isDisabledCAC(true))
    await requestCategoriesApi.deleteByIdCategory(token, categoryId).then(res => {
        MaterialService.toast(res.data.message)
    }).catch(error => MaterialService.toast(error.response.data.message))
    dispatch(actions.setCategory({name: '', imageSrc: '', user:'', _id: ''}))
    dispatch(actions.isNewCategory(true))
    dispatch(actions.isDisabledCAC(false))
}
