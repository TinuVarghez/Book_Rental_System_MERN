import React, { useEffect, useReducer } from "react";
import './Input.css'
import { validate } from "../UTIL/Validators";

const inputReducer = (state,action)=>{
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                //isvalid:true
                isvalid: validate(action.value, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched:true
            }
        default:
            return state;
    }
}

const Input = (props)=>{
    const [inputState, dispatch]=useReducer(inputReducer, {value:'', isvalid:false, isTouched:false});

    const {id, onInput} = props;

    const {value, isvalid} = inputState

    useEffect(()=>{
        onInput(id,value,isvalid)
    },[id,value,isvalid,onInput])

    const changeHandler = (event)=>{
        console.log("Input has been changed")
        dispatch({type:'CHANGE', value:event.target.value, validators:props.validators})
    }

    const touchHandler = ()=>{
        dispatch({type:'TOUCH'})
    }

    const element = props.element=== 'input'?
    (<input id={props.id} type={props.type} placeholder={props.placeholder} onBlur={touchHandler} onChange={changeHandler} value={inputState.value}></input>):
    (<textarea id={props.id} rows={props.rows || 3} onBlur={touchHandler} onChange={changeHandler} value={inputState.value}></textarea>)

    return (
        <div className={`form-control ${!inputState.isvalid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isvalid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )

}

export default Input