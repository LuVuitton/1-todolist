import React, {ChangeEvent, FC, useState} from "react";

 type PropsType = {
    value: string
    callback:(value:string)=>void
    itemID: string
}


export const EditableSpan: FC<PropsType> = React.memo(({value,callback}) =>{
    const [spanState, setSpanState] = useState(true)
    const [newValue, setNewValue] = useState(value)

    const switchDoubleClick = () => {
        setSpanState(!spanState)
    }
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setNewValue(e.currentTarget.value)
    }
    const onBlurHandler = ()=>{
        callback(newValue)
        setSpanState(!spanState)
    }




    return (
        <>
        {spanState                                                                      //условие в жсх
            ? <span onDoubleClick={switchDoubleClick}>{value}</span>
            : <input value={newValue} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        }
        </>
            )
})




