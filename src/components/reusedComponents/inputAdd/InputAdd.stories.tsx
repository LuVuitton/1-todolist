
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputAdd } from './InputAdd';
import {action} from "@storybook/addon-actions";

export default {
    title: 'InputAdd',
    component: InputAdd,
} as ComponentMeta<typeof InputAdd>;

const callback = ()=> {
   return  new Promise((resolve) => {
        resolve(action('add was pressed'))
    })
}


export const ClickAddOnInput: ComponentStory<typeof InputAdd> = () => <InputAdd  placeholder='stories' clickToAdd={callback} ></InputAdd>;
