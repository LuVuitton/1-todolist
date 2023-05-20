import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {List} from './List';
import {action} from "@storybook/addon-actions";
import {FilterButtonDataType, FilterType} from "../../Types";

export default {
    title: 'ToDoList',
    component: List,
} as ComponentMeta<typeof List>;

export type dataForListType = {
    titleList: string,
    tasks: [],
    filter: FilterType,
    toDoListID: string,
    filterButtonData: FilterButtonDataType[]
    listIsLoading: boolean
}

const dataForList: dataForListType = {
    listIsLoading: true,
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

export const ResponseToActionToDoList: ComponentStory<typeof List> = () => <List
    {...dataForList}

    removeList={removeList}


></List>;
