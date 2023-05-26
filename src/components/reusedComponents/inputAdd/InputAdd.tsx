import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';
import { Input } from 'antd';
import s from './InputAdd.module.css'

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const { TextArea } = Input;


export const InputAdd: FC<PropsType> = memo(({ clickToAdd, disabled, placeholder }) => {

    // const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean | string>(false)
    const [inputValue, setInputValue] = useState('');


    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    const clickOnButton = () => {
        // debugger
        if (inputValue.trim() === '') {  //обрезаем пробелы и проверяем на наличие символов
            setError(true)
            return
        }
        clickToAdd(inputValue).then(() => {
            setInputValue('')
        })
            .catch((err: string) => {
                setError(err)
            })

    }


    const pressEnterToAddTask = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value.trim() === '') {              
            setError(true)
            e.currentTarget.blur()
            return
        }
        clickOnButton()

    }


    return (
        <>
            <div className={s.mainWrapper}>

                <TextArea
                    value={inputValue}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={placeholder}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    disabled={disabled}
                    onPressEnter={pressEnterToAddTask}
                    allowClear
                    showCount
                    className={s.antTextArea}
                />

                <Button
                    className={s.btn}
                    disabled={disabled}
                    shape="circle"
                    onClick={clickOnButton}
                    icon={<PlusOutlined rev={'max'} spin={disabled} />} />






            </div>
            {error &&
                // <div>{typeof error === "boolean"? 'error': error}</div>
                <div>error</div>
            }
        </>
    );
})









type PropsType = {
    clickToAdd: (inputValue: string) => Promise<any>
    disabled?: boolean
    placeholder: string
}