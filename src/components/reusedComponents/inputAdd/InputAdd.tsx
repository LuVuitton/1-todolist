import { ChangeEvent, FC, FocusEventHandler, KeyboardEvent, memo, useState } from 'react';
import { Input } from 'antd';
import s from './InputAdd.module.css'
import { PlusOutlined } from '@ant-design/icons';
import { Button,notification } from 'antd';







const { TextArea } = Input;


export const InputAdd: FC<PropsType> = memo(({ clickToAdd, disabled, placeholder, instance }) => {

    // const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean | string>(false)
    const [inputValue, setInputValue] = useState('');


    const openErrorNotification = (error: string) => {
        notification.error({
            message: error,
            // description: error,
            placement: 'bottomRight'

        });
    };
    const openSuccessNotification = () => {
        notification.success({
            message: `${instance} has been set`,
            // description: `${instance} has been set`,
            placement: 'bottomRight'

        });
    };
    // <div>{typeof error === "boolean"? 'error': error}</div>

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }


    const clickOnButton = () => {
        // debugger
        if (inputValue.trim() === '') {  //обрезаем пробелы и проверяем на наличие символов
            setError(true)
            openErrorNotification('gotta write something')
            return
        }
        clickToAdd(inputValue).then(() => {
            setInputValue('')
            openSuccessNotification()

        })
            .catch((err: string) => {
                console.log(err);
                
                setError(err)
            })

    }


    const pressEnterToAddTask = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value.trim() === '') {
            setError(true)
            openErrorNotification("gotta write something")
            e.currentTarget.blur()
            return
        }
        clickOnButton()
        e.currentTarget.blur()

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
                    status={error?'error':''}
                />

                <Button
                    className={s.btn}
                    disabled={disabled}
                    shape="circle"
                    onClick={clickOnButton}
                    icon={<PlusOutlined rev={'max'} spin={disabled} />}
                />

            </div>
        </>
    );
})









type PropsType = {
    clickToAdd: (inputValue: string) => Promise<any>
    disabled?: boolean
    placeholder: string
    instance: 'List' | 'Task'
}