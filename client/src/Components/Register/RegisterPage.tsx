import * as React from 'react'
import {registerThunk} from "../../State/auth-reducer";
import {FormPage} from "../Component/Forma/FormaAuth";
import {useDispatch, useSelector} from "react-redux";
import {IsDisabledAuthSelector} from "../../State/Reselect/auth-reselect";
import {useHistory} from "react-router-dom";


export const RegisterPage: React.FC = () => {
    const isDisabled = useSelector(IsDisabledAuthSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const namePage = 'Register'
    const nameBtn = 'Create'
    return <FormPage namePage={namePage} nameBtn={nameBtn} isDisabled={isDisabled} submitForm={(user) => {
        dispatch(registerThunk(user))
        history.push('/login')
    }}/>
}

