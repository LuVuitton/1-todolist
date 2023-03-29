import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {StatusesForTask, TaskPropsType} from "../Types";


//Поправить чекед в инпуте и в классе, что бы проверяд на статусы

export const Task = React.memo((props: TaskPropsType) => {

    return <div className={props.checked === StatusesForTask.Completed ? 'isDone': ''} key={props.taskID}>
        <input type={props.type} checked={props.checked === StatusesForTask.Completed} onChange={props.onChangeHandler} key={props.taskID}/>
        <EditableSpan value={props.taskValue} callback={props.coverAddEditedTask}
                      itemID={props.taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
        <button onClick={() => {
            props.removeTaskHandler(props.taskID)
        }}> x
        </button>
    </div>
})
