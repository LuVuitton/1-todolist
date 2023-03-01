import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskPropsType} from "../Types";


export const Task = React.memo((props: TaskPropsType) => {

    return <div className={props.checked ? 'isDone' : ''} key={props.taskID}>
        <input type={props.type} checked={props.checked} onChange={props.onChangeHandler} key={props.taskID}/>
        <EditableSpan value={props.taskValue} callback={props.coverAddEditedTask}
                      itemID={props.taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
        <button onClick={() => {
            props.removeTaskHandler(props.taskID)
        }}> x
        </button>
    </div>
})
