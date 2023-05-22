import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';


type PropsType = {
    clickToAdd: (inputValue: string) => Promise<any>
    disabled?: boolean
}


export const InputAdd: FC<PropsType> = memo(({clickToAdd, disabled}) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean|string>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    const clickOnButton = () => {
        if (inputValue.trim() === '') {  //обрезаем пробелы и проверяем на наличие символов
            setError(true)
            return
        }
        clickToAdd(inputValue).then(() => {
            setInputValue('')
        })
            .catch((err:string)=>{
                setError(err)
            })

    }


    const pressEnterToAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && inputValue.trim() !== '') {
            clickToAdd(inputValue)
            setInputValue('')
        } else if (e.charCode === 13 && inputValue.trim() === '') {
            setInputValue('')
            setError(true)
        }
    }


    return (
        <div>

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
            {error &&
                <div>{typeof error === "boolean"? 'error': error}</div>
            }
        </div>
    );
})

