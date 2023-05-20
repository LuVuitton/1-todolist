import React, {FC, memo} from 'react';


type PropsType = {
    title: string
    callback: () => void
    cssClass: string
}



export const FilterButton: FC<PropsType> = memo(({title,callback, cssClass}) => {


    const onCLickHandler = () => callback()

    return <button onClick={onCLickHandler} className={cssClass}> {title} </button>
})