import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {ToDoList} from '../components/ToDoList';
import {action} from "@storybook/addon-actions";
import {FilterButtonDataType, FilterType, TasksType} from "../Types";

export default {
    title: 'ToDoList',
    component: ToDoList,
} as ComponentMeta<typeof ToDoList>;

export type dataForListType = {
    titleList: string,
    tasks: [],
    filter: FilterType,
    toDoListID: string,
    filterButtonData: FilterButtonDataType[]
}

const dataForList: dataForListType = {
    titleList: 'list name',
    tasks: [],
    filter: 'all',
    toDoListID: 'listID',
    filterButtonData:[ {
        id: 'buttonID',
        title: 'all'
    }]
}

const removeTask = action('removeTask')
const changeFilter = action('changeFilter')
const addItem = action('addItem')
const switchCheckbox = action('switchCheckbox')
const removeList = action('removeList')
const addEditedTask = action('addEditedTask')
const addEditedListTitle = action('addEditedListTitle')


export const ResponseToActionToDoList: ComponentStory<typeof ToDoList> = () => <ToDoList
    {...dataForList}
    removeTask={removeTask}
    changeFilter={changeFilter}
    addItem={addItem}
    switchCheckbox={switchCheckbox}
    removeList={removeList}
    addEditedTask={addEditedTask}
    addEditedListTitle={addEditedListTitle}
    filterButtonsData={dataForList.filterButtonData}

></ToDoList>;
