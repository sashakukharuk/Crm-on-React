import React, {MutableRefObject, RefObject, useEffect, useRef} from 'react'
import {NavLink} from "react-router-dom";
import {MaterialService} from "../Component/Material/Material";
import {actions} from "../../State/categories-reducer";
import {useDispatch} from "react-redux";

export const Floating = () => {
    const dispatch = useDispatch()
    const floating: MutableRefObject<HTMLDivElement | null | undefined> = useRef()
    useEffect(() => {
        MaterialService.initializeFloatingButton(floating as RefObject<HTMLDivElement>)
    }, [])

    return <div className="fixed-action-btn" ref={floating as RefObject<HTMLDivElement>}>
    <a className="btn-floating btn-large red">
        <i className="large material-icons">add</i>
    </a>
    <ul>
        <li>
            <NavLink className="btn-floating green" to="/order">
                <i className="material-icons">assignment</i>
            </NavLink>
        </li>
        <li>
            <NavLink className="btn-floating blue" to="/categories/new" onClick={() => dispatch(actions.isNewCategory(true))}>
                <i className="material-icons">list</i>
            </NavLink>
        </li>
    </ul>
</div>
}
