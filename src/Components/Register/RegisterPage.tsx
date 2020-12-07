import * as React from 'react'
import {registerThunk} from "../../State/auth-reducer";
import {FormPage} from "../Component/Forma/FormaAuth";


export const RegisterPage: React.FC = () => {
    const namePage = 'Register'
    const nameBtn = 'Create'
    return <FormPage namePage={namePage} nameBtn={nameBtn} thunkCreator={registerThunk}/>
}

