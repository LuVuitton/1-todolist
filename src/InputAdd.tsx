import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    clickToAddTask: (inputValue: string) => void
}


const InputAdd: React.FC<PropsType> = (props: PropsType) => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    function clickOnButton() {
        if (inputValue.trim() === '') {  //обрезаем пробелы и проверяем на наличие символов
            setInputValue('')
            setError(true)
            return
        }
        props.clickToAddTask(inputValue)
        setInputValue('')
    }

    function pressEnterToAddTask(e: KeyboardEvent<HTMLInputElement>) {
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
}

export default InputAdd;
