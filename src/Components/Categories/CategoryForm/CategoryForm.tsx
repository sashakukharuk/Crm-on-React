import React, {ChangeEvent} from 'react'
import {NavLink} from 'react-router-dom'
import {FormCategories} from '../../Component/Forma/FormaCategories'
import {useDispatch, useSelector} from 'react-redux'

import {
    actions,
    createCategoriesThunk,
    removeByIdCategory,
    updateByIdCategory
} from '../../../State/categories-reducer'
import {Positions} from './PositionsForm/Positions'
import {
    CategorySelector, ImagePreviewSelector,
    ImageSelector,
    IsDisabledCSelector,
    IsNewSelector
} from '../../../State/Reselect/categories-reselect'
import {TokenSelector} from '../../../State/Reselect/auth-reselect'
import {Preloader} from "../../Component/Preloader/Preloader";

export const CategoryForm: React.FC = () => {
    const isNew = useSelector(IsNewSelector)
    const token = useSelector(TokenSelector)
    const image = useSelector(ImageSelector)
    const imagePreview = useSelector(ImagePreviewSelector)
    const category = useSelector(CategorySelector)
    const isDisabledC = useSelector(IsDisabledCSelector)
    const dispatch = useDispatch()
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setName(e.currentTarget.value))
    }
    const onImageChange = (e: any) => {
        const image = e.currentTarget.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            dispatch(actions.setImagePreview(reader.result as null | string))
        }
        reader.readAsDataURL(image)

        dispatch(actions.setPhoto(image))
    }
    const sendCreate = () => {
        dispatch(createCategoriesThunk(token, image, category))
    }
    const sendUpdate = () => {
        dispatch(updateByIdCategory(token, image, category, category._id))
    }
    const submitDelete = () => {
        dispatch(removeByIdCategory(token, category._id))
    }

    return <>
            <div className="page-title">
                <h4>
                    <NavLink to='/categories'>Categories</NavLink>
                    <i className="material-icons">keyboard_arrow_right</i>
                    <span>{isNew ? 'Add ' : 'Editing'} category</span>
                </h4>
                {!isNew && <span>
                    <button className="btn btn-small red" disabled={isDisabledC} onClick={submitDelete}>
                      <i className="material-icons">delete</i>
                    </button>
                </span>}
            </div>

            {isNew
                ? <FormCategories
                    name={category.name}
                    imageSrc={category.imageSrc}
                    isDisabledC={isDisabledC}
                    imagePreview={imagePreview}
                    onNameChange={onNameChange}
                    onImageChange={onImageChange}
                    sendCategory={sendCreate}
                />
                : <FormCategories
                    name={category.name}
                    imageSrc={category.imageSrc}
                    isDisabledC={isDisabledC}
                    imagePreview={imagePreview}
                    onNameChange={onNameChange}
                    onImageChange={onImageChange}
                    sendCategory={sendUpdate}
                />
            }
            {!isNew ? category._id ? <Positions categoryId={category._id}/> : <Preloader/> : <div/>}
        </>
}
