import React from 'react';

import {FilterButtonPropsType} from "../Types";



export const FilterButton = (props:FilterButtonPropsType) => {

    const onCLickHandler=()=> props.callback()

    return <button onClick={onCLickHandler} className={props.cssClass}> {props.title} </button>
}