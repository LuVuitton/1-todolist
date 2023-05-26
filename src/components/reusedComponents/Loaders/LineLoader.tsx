import React from 'react';
import {  Spin } from 'antd';
import s from './style.module.css'



export const LineLoader: React.FC = () => {
    return (

        <div className={s.lineLoaderWrapper}>
            <Spin size="default" />
        </div>

    );
}