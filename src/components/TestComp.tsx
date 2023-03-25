import React, {ChangeEvent, useEffect, useState} from 'react';
import {toDoListsAPI} from "../API-Functional/ToDoListsAPI";


export const TestComp = () => {
    console.log('rerender')
    const testDivStyles = {
        border: 'red solid 3px',
        minWidth: '250px',
        minHeight: '250px',
    }
    const [state, setState] = useState<any>(null)
    const [check, setCheck] = useState(false)
    const [inputValue, setInputValue] = useState<any>('')
    const [arrID, setArrID] = useState([])

    useEffect(() => {
        toDoListsAPI.getLists().then(r => {
            setArrID(r.map((e: any) => e.id))
            setState(r.map((e: any, i: number) => <div key={i}><span>{i + 1}</span> {e.title} </div>))
        })
    }, [check])


    const postListHandler = () => {
        toDoListsAPI.postList(inputValue).then(()=> setCheck(!check))
        setInputValue('')
    }
    const deleteLastList = () => {
        toDoListsAPI.deleteList(arrID[0]).then(()=> setCheck(!check))
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }



    return (
        <div style={testDivStyles}>
            <input type="text" value={inputValue} onChange={inputChangeHandler}/>
            <button onClick={postListHandler}>post list</button>
            <div>
                <button onClick={deleteLastList}>delete last list</button>
            </div>
            {state}
        </div>
    )
}
