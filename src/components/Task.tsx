import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {StatusesForTask, TaskPropsType} from "../Types";


export const Task = React.memo((props: TaskPropsType) => {

    return <div className={props.checked === StatusesForTask.Completed ? 'isDone': ''} key={props.taskID}>
        <input
            type={props.type}
            //костыли пока чекбокс заточен по булево значение
            checked={props.checked === StatusesForTask.Completed}
            onChange={()=>props.onChangeHandler(props.checked === StatusesForTask.Completed ? StatusesForTask.New: StatusesForTask.Completed)}
            key={props.taskID}
        />
        <EditableSpan value={props.taskValue} callback={props.coverAddEditedTask}
                      itemID={props.taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
        <button onClick={() => {
            props.removeTaskHandler(props.taskID)
        }}> x
        </button>
    </div>
})

