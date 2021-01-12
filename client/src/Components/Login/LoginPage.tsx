import * as React from 'react'
import {loginThunk} from "../../State/auth-reducer";
import {FormPage} from "../Component/Forma/FormaAuth";
import {useDispatch, useSelector} from "react-redux";
import {IsDisabledAuthSelector} from "../../State/Reselect/auth-reselect";

export const LoginPage: React.FC = () => {
    const isDisabled = useSelector(IsDisabledAuthSelector)
    const dispatch = useDispatch()
    const namePage = 'Login in'
    const nameBtn = 'Login'
    return <FormPage namePage={namePage} nameBtn={nameBtn} isDisabled={isDisabled} submitForm={(user) => {
        dispatch(loginThunk(user))
    }}/>
}
