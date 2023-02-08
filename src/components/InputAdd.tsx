import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {InputAddPropsType} from "../Types";




const InputAdd = React.memo( (props:InputAddPropsType) => {
    console.log('inputAdd')

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
            />
            <button onClick={clickOnButton}>
                +
            </button>
        </div>
    );
})

export default InputAdd;
