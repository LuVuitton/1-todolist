import React from 'react';

import {FilterButtonPropsType} from "../Types";


export const FilterButton = React.memo((props: FilterButtonPropsType) => {
    console.log('FilterButton')
    const onCLickHandler = () => props.callback()

    return <button onClick={onCLickHandler} className={props.cssClass}> {props.title} </button>
})