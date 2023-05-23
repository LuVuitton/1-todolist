import React, {FC, memo} from 'react';
import {EditableSpan} from "../../components/reusedComponents/EditableSpan/EditableSpan";
import {CheckStatus} from "../../Types";
import {useActions} from "../../customHooks";
import {taskActionsGroup} from "./index";
import s from './style.module.css'


export const Task: FC<PropsType> = memo(({taskID, type, taskIsLoading, taskValue, listID, checked}) => {

    const {removeTask, switchTaskCheck, updateTask} = useActions(taskActionsGroup)

    const IDs = {
        listID: listID,
        taskID: taskID,
    }

    const removeTaskHandler = () => removeTask({...IDs})

    const onChangeHandler = (check: CheckStatus) => switchTaskCheck({...IDs, check})

    const addEditedTask = (title: string) => updateTask({...IDs, title,})


    return (
    <span className={checked === CheckStatus.Completed ? s.isDone : ''} key={taskID}>
        <input
            type={type}
            //костыли пока чекбокс заточен под булево значение
            checked={checked === CheckStatus.Completed}
            onChange={() => onChangeHandler(checked === CheckStatus.Completed ? CheckStatus.New : CheckStatus.Completed)}
            key={taskID}
        />
        <EditableSpan value={taskValue} callback={addEditedTask}
                      itemID={taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
        <button
            disabled={taskIsLoading}
            onClick={removeTaskHandler}> x
        </button>
    </span>
    )
})

type PropsType = {
    type: string
    checked: CheckStatus
    taskValue: string
    taskID: string
    taskIsLoading: boolean
    listID: string
}
