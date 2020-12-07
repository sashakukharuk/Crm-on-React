import React, {ChangeEvent} from 'react'
import {NavLink} from 'react-router-dom'
import {FormCategories} from '../../Component/Forma/FormaCategories'
import {useDispatch, useSelector} from 'react-redux'
import s from './Category.module.css'

import {
    actions,
    createCategoriesThunk,
    removeByIdCategory,
    updateByIdCategory
} from '../../../State/categories-reducer'
import {Positions} from './PositionsForm/Positions'
import {
    CategorySelector,
    ImageSelector,
    IsDisabledCSelector,
    IsNewSelector
} from '../../../State/Reselect/categories-reselect'
import {TokenSelector} from '../../../State/Reselect/auth-reselect'

export const CategoryForm: React.FC = () => {
    const isNew = useSelector(IsNewSelector)
    const token = useSelector(TokenSelector)
    const image = useSelector(ImageSelector)
    const category = useSelector(CategorySelector)
    const isDisabledC = useSelector(IsDisabledCSelector)
    const dispatch = useDispatch()
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setName(e.currentTarget.value))
    }
    const onImageChange = (e: any) => {
        const image = e.currentTarget.files[0]
        dispatch(actions.setPhoto(image))
    }
    const submitCreate = (value: any, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        dispatch(createCategoriesThunk(token, image, category))
        setSubmitting( false)
    }
    const submitUpdate = (value: any, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        dispatch(updateByIdCategory(token, image, category, category._id))
        setSubmitting( false)
    }
    const submitDelete = () => {
        dispatch(removeByIdCategory(token, category._id))
    }

    return (
        <div>
            <div className={s.pageTitle}>
                <h4>
                    <NavLink to ='/categories'>Categories</NavLink>
                    <i>/</i>
                    <span>{isNew ? 'Add ' : 'Editing'} category</span>
                </h4>
                {!isNew && <span><button className={isDisabledC ? s.active : ''} disabled={isDisabledC} onClick={submitDelete}>delete</button></span>}
            </div>
            {isNew
                ? <FormCategories
                    name={category.name}
                    imageSrc={category.imageSrc}
                    isDisabledC={isDisabledC}
                    onNameChange={onNameChange}
                    onImageChange={onImageChange}
                    submit={submitCreate}
                />
                : <FormCategories
                    name={category.name}
                    imageSrc={category.imageSrc}
                    isDisabledC={isDisabledC}
                    onNameChange={onNameChange}
                    onImageChange={onImageChange}
                    submit={submitUpdate}
                />
            }
            {!isNew ? category._id ? <Positions categoryId={category._id}/> : <div>Loading...</div> : <div/>}
        </div>
    )
}
