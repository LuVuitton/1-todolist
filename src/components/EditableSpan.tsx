import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    callback:(value:string, taskId:string)=>void
    itemID: string
}

export const EditableSpan = React.memo((props:EditableSpanPropsType) =>{
    console.log('EditableSpan')
    const [spanState, setSpanState] = useState(true)
    const [newValue, setNewValue] = useState(props.value)

    const switchDoubleClick = () => {
        setSpanState(!spanState)
    }
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setNewValue(e.currentTarget.value)
    }
    const onBlurHandler = ()=>{
        props.callback(newValue, props.itemID)
        setSpanState(!spanState)
    }




    return (
        <>
        {spanState                                                                      //условие в жсх
            ? <span onDoubleClick={switchDoubleClick}>{props.value}</span>
            : <input value={newValue} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        }
        </>
            )
})




