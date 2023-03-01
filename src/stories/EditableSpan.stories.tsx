
import React, {useState} from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import {EditableSpan} from '../components/EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

export const ResponseToActionEditableSpan: ComponentStory<typeof EditableSpan> = () => <EditableSpan
    value={'edited value'}
    callback={action('focus off')}
    itemID={'itemID'}
></EditableSpan>;

export const ChangeValueEditableSpan = () => {

    const [value, setValue] = useState('edit me')

    return <EditableSpan
        value={value}
        callback={(e)=>setValue(e)}
        itemID={'itemID'}
    ></EditableSpan>;

}

