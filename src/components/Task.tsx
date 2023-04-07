import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {CheckStatus, TaskPropsType} from "../Types";


export const Task = React.memo((props: TaskPropsType) => {

    return <div className={props.checked === CheckStatus.Completed ? 'isDone': ''} key={props.taskID}>
        <input
            type={props.type}
            //костыли пока чекбокс заточен под булево значение
            checked={props.checked === CheckStatus.Completed}
            onChange={()=>props.onChangeHandler(props.checked === CheckStatus.Completed ? CheckStatus.New: CheckStatus.Completed)}
            key={props.taskID}
        />
        <EditableSpan value={props.taskValue} callback={props.coverAddEditedTask}
                      itemID={props.taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
        <button
            disabled={props.entityStatus==="loading"}
            onClick={() => props.removeTaskHandler(props.taskID)}> x
        </button>
    </div>
})

