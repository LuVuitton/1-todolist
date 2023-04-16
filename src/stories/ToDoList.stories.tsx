import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {ToDoList} from '../components/ToDoList';
import {action} from "@storybook/addon-actions";
import {FilterButtonDataType, FilterType} from "../Types";
import {StatusType} from "../redux/reducers/appReducer";

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
    entityStatus: StatusType
}

const dataForList: dataForListType = {
    entityStatus: 'idle',
    titleList: 'list name',
    tasks: [],
    filter: 'all',
    toDoListID: 'listID',
    filterButtonData:[ {
        id: 'buttonID',
        title: 'all'
    }]
}


const removeList = action('removeList')

export const ResponseToActionToDoList: ComponentStory<typeof ToDoList> = () => <ToDoList
    {...dataForList}

    removeList={removeList}


></ToDoList>;
