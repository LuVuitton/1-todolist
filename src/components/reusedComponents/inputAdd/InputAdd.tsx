import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';


type PropsType = {
    clickToAddTask: (inputValue: string) => void
    disabled?:boolean
}


export const InputAdd: FC<PropsType> = memo( ({clickToAddTask,disabled}) => {
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
        clickToAddTask(inputValue)
        setInputValue('')
    }

    const pressEnterToAddTask = (e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode === 13 && inputValue.trim() !== '') {
            clickToAddTask(inputValue)
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
                disabled={disabled}
            />
            <button
                onClick={clickOnButton}
            disabled={disabled}
            >
                +
            </button>
        </div>
    );
})

