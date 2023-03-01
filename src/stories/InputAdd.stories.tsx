
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputAdd } from '../components/InputAdd';
import {action} from "@storybook/addon-actions";

export default {
    title: 'InputAdd',
    component: InputAdd,
} as ComponentMeta<typeof InputAdd>;

const callback =  action('add was pressed')

export const ClickAddOnInput: ComponentStory<typeof InputAdd> = () => <InputAdd   clickToAddTask={callback} ></InputAdd>;
