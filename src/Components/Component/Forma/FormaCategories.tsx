import React, {ChangeEvent, useState} from 'react'
import s from '../../Categories/CategoryForm/CategoryForm.module.css'
import cn from 'classnames'

type PropsType = {
    name: string
    imageSrc: string
    isDisabledC: boolean
    imagePreview: null | string
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
    onImageChange: (e: any) => void
    sendCategory: () => void
}

export const FormCategories: React.FC<PropsType> = (props) => {
   const [validate, setValidate] = useState('')
    const onValidate = () => {
        if (!props.name) {
            setValidate('Required')
        } else {
            setValidate('')
        }
    }

    return <div className="row">
        <div className="col s12 l6">
            <div className="input-field">
                <input id='name' type='text' name='name' value={props.name} onBlur={onValidate} onChange={(e) => {
                    props.onNameChange(e)
                }}/>
                <label htmlFor="name">Name</label>
                <span className="helper-text red-text">
                    {validate && <span>{validate}</span>}
                </span>
            </div>

            <div className={s.fieldPhoto}>
                <input className="dn" id='file' type='file' name='imageSrc' onChange={props.onImageChange}/>
                <label className="waves-effect waves-light btn orange lighten-2 mb2" htmlFor="file">Upload</label>
            </div>

            <div style={{textAlign: "left"}}>
                <button className="waves-effect waves-light btn" disabled={props.isDisabledC} onClick={props.sendCategory}>
                    Save
                </button>
            </div>
        </div>

        <div className={cn("col s12 l4 center", s.photo)}>
            {props.imagePreview ?
                <img className="responsive-img" style={{height: '200px'}} src={props.imagePreview} alt=''/>
                : <img className="responsive-img" style={{height: '200px'}} src={`/${props.imageSrc}`} alt=''/>}
        </div>
    </div>
}
