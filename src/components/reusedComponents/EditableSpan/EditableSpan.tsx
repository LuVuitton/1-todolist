import React, { ChangeEvent, FC, useState } from "react";
import { Typography, Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import s from './style.module.css'


const { Title, Text } = Typography;
const { TextArea } = Input


type PropsType = {
    value: string
    callback: (value: string) => void
    itemID: string
    textSize: 1 | 2 | 3 | 4 | 5
    textOption: 'title' | 'text'
}


export const EditableSpan: FC<PropsType> = React.memo(({ value, callback, textSize, textOption }) => {
    const [editMode, setSpanState] = useState(false)
    const [newValue, setNewValue] = useState(value)

    const switchDoubleClick = () => {
        setSpanState(!editMode)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewValue(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        callback(newValue)
        setSpanState(!editMode)
    }




    return (
        <>
            {!editMode                                                                      //условие в жсх
                ? <div className={s.textWrapper}>
                    {
                        textOption === 'title'
                            ? <Title
                                onDoubleClick={switchDoubleClick}
                                level={textSize}

                            >
                                {value}
                            </Title>
                            : <Text
                                onDoubleClick={switchDoubleClick}
                                type="secondary"
                            >
                                {value}
                            </Text>
                    }
                    <Button type="text" onClick={switchDoubleClick} icon={<EditOutlined rev={'max'} />} />                    </div>

                : <TextArea
                    value={newValue}
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={onBlurHandler}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    onPressEnter={onBlurHandler}
                    allowClear
                    showCount
                    autoFocus

                />
            }





        </>
    )
})



