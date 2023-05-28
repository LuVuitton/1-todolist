import React, { FC, memo } from 'react';
import { EditableSpan } from "../../components/reusedComponents/EditableSpan/EditableSpan";
import { CheckStatus } from "../../Types";
import { useActions } from "../../customHooks";
import { taskActionsGroup } from "./index";
import s from './style.module.css'
import { Button,Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import {getDate} from '../../utilities'



const { Text } = Typography;



export const Task: FC<PropsType> = memo(({ taskID, taskIsLoading, taskValue, listID, checked,addedDate }) => {

    const { removeTask, switchTaskCheck, updateTask } = useActions(taskActionsGroup)


    const IDs = {
        listID: listID,
        taskID: taskID,
    }

    const removeTaskHandler = () => removeTask({ ...IDs })

    const onChangeHandler = (check: CheckStatus) => switchTaskCheck({ ...IDs, check })

    const addEditedTask = (title: string) => updateTask({ ...IDs, title, })

    const ParsedDateTime = getDate(addedDate)


    return (
        <div className={s.mainWrapper}>

            <div>
                <Text className={s.dataText} type="secondary">{ParsedDateTime.date} {ParsedDateTime.time}</Text>
                <EditableSpan
                    textOption='text'
                    textSize={5}
                    value={taskValue}
                    callback={addEditedTask}
                    itemID={taskID}
                />

            </div>
            <div className={s.checkButtonWrapper}>
                <div>
                    <Checkbox
                        onChange={() => onChangeHandler(checked === CheckStatus.Completed ? CheckStatus.New : CheckStatus.Completed)}
                        checked={checked === CheckStatus.Completed}
                        disabled={taskIsLoading}
                    />
                </div>
                <div>
                    <Button
                        disabled={taskIsLoading}
                        onClick={removeTaskHandler}
                        type='text'
                        icon={<DeleteOutlined rev={'max'} />}
                    />
                </div>
            </div>

        </div>
    )
})

type PropsType = {
    checked: CheckStatus
    taskValue: string
    taskID: string
    taskIsLoading: boolean
    listID: string
    addedDate:string
}
