import * as React from 'react'
import {loginThunk} from "../../State/auth-reducer";
import {FormPage} from "../Component/Forma/FormaAuth";


export const LoginPage: React.FC = () => {
    const namePage = 'Login in'
    const nameBtn = 'Login'
    return <FormPage namePage={namePage} nameBtn={nameBtn} thunkCreator={loginThunk}/>
}
