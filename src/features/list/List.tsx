import React, { FC, memo, useCallback, useMemo } from 'react';
import { InputAdd } from "../../components/reusedComponents/inputAdd/InputAdd";
import { CheckStatus, FilterType, OneTaskType } from "../../Types";
import { FilterBtns } from "../filterBtns/FilterBtn";
import { Task, taskActionsGroup, taskSelectors } from "../task";
import { useActions, useCustomSelector } from "../../customHooks";
import { listActionsGroup } from "./";
import { ListTitle } from "../listTitle/ListTitle";
import { List as AntList, Button,  } from 'antd';
import s from './style.module.css'
import { DeleteFilled } from '@ant-design/icons';





export const List: FC<PropsType> = memo(({ listID, listIsLoading, listFilter }) => {
    const { addTask } = useActions(taskActionsGroup)
    const { removeList } = useActions(listActionsGroup)
    // const tasks = useCustomSelector<OneTaskType[]>(state => state.tasks[props.toDoListID])
    const tasks = useCustomSelector(taskSelectors.selectAllTasks(listID))


    let filteredTasks: OneTaskType[] = tasks;


    if (listFilter === 'active' || listFilter === 'completed') {
        filteredTasks = tasks.filter(e => listFilter === 'active'
            ? e.status === CheckStatus.New
            : e.status === CheckStatus.Completed)
    }


    const removeListHandler = () => removeList(listID)

    const addTaskHandler = useCallback((title: string) => {
        return addTask({ listID: listID, title }).unwrap()
    }, [])


    ////////////tasksMAP
    // юзМемо, т.к. у нас 2 компоненты с тудулистом, каждый отрисовывает свои таски(2 разных мапа в двух разных тудулистах)
    // пропсы в каждый тудулист приходят со своими тасками
    // мы меняем стейт только для одного списка тасок из двух, например чек бокс
    // после Апп опять прокидывает списки тасок по тудулистам и т.к. изменения проихошли только в одном списке, второй не мапится
    // т.к. в редьюсере мы возвращаем поверхностную копию всех тасок,
    // вложеные массивы не копируются и при сравнении юзМемо видит тот же массив(массив который не меняли), а на место старого мы вернули копию через метод

    const mappedTasks = useMemo(() => {
        return filteredTasks.map((e) => {

            return (
                <Task
                    key={e.id}
                    type={'checkbox'}
                    checked={e.status} // передаьб статус
                    taskValue={e.title}
                    taskID={e.id}
                    taskIsLoading={e.taskIsLoading}
                    listID={e.todoListId}
                />)
        })
    }, [filteredTasks])
    /////////////tasksMAP done


    return (
        <div className={s.mainWrapper}>


            <div className={s.titleWrapper}>
                <ListTitle listID={listID} />

                <Button
                    disabled={listIsLoading}
                    onClick={removeListHandler}
                    shape="circle"
                    icon={<DeleteFilled rev={'max'} />}
                />

            </div>

            <AntList
                className={s.list}
                size="small"
                header={<InputAdd placeholder={'create a new task'} clickToAdd={addTaskHandler} disabled={listIsLoading} />}
                footer={<div> <FilterBtns listID={listID} /> </div>}
                bordered
                dataSource={filteredTasks}
                renderItem={(e: OneTaskType) => {
                    return <AntList.Item>
                        <Task
                            key={e.id}
                            type={'checkbox'}
                            checked={e.status} // передаьб статус
                            taskValue={e.title}
                            taskID={e.id}
                            taskIsLoading={e.taskIsLoading}
                            listID={e.todoListId}
                        />
                    </AntList.Item>
                }}
            />


        </div>
    );
})


type PropsType = {
    listID: string
    listIsLoading: boolean
    listFilter: FilterType
}

