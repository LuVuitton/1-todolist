import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {InputAddPropsType} from "../Types";




export const InputAdd = React.memo( (props:InputAddPropsType) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    const clickOnButton=() =>{
        if (inputValue.trim() === '') {  //обрезаем пробелы и проверяем на наличие символов
            setInputValue('')
            setError(true)
            return
        }
        props.clickToAddTask(inputValue)
        setInputValue('')
    }

    const pressEnterToAddTask = (e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode === 13 && inputValue.trim() !== '') {
            props.clickToAddTask(inputValue)
            setInputValue('')
        } else if (e.charCode === 13 && inputValue.trim() === '') {
            setInputValue('')
            setError(true)
        }
    }


    return (
        <div>
            {error &&
                <div>ERROR</div>
            }
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={pressEnterToAddTask}
                disabled={props.disabled}
            />
            <button
                onClick={clickOnButton}
            disabled={props.disabled}
            >
                +
            </button>
        </div>
    );
})

