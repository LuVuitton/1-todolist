import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    value: string
}

function EditableSpan(props: EditableSpanType) {

    const [spanState, setSpanState] = useState(true)
    const [newValue, setNewValue] = useState(props.value)

    const switchDoubleClick = () => {
        setSpanState(!spanState)
    }
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setNewValue(e.currentTarget.value)
    }
    const onBlurHandler = ()=>{
        console.log('blur')
    }


    return (
        <>
        {spanState                                                                      //условие в жсх
            ? <span onDoubleClick={switchDoubleClick}>{props.value}</span>
            : <input value={newValue} onChange={onChangeHandler} onBlur={onBlurHandler}/>
        }
        </>
            )
}


export default EditableSpan