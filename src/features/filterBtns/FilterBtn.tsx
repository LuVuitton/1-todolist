import React, {FC, memo} from 'react';
import s from "./style.module.css";
import {useActions, useCustomSelector} from "../../customHooks";
import {selectListFilter} from "../list/lists.selectors";
import {listActionsGroup} from "../list";
import {FilterType} from "../../Types";

import { Segmented } from 'antd';


const filterButtonsData: FilterType[] = ['all','active','completed',]


export const FilterBtns: FC<PropsType> = memo(({listID}) => {

    const listFilter = useCustomSelector(selectListFilter(listID))
    const {changeListFilter} = useActions(listActionsGroup)


    // const changeListFilterHandler = (filter: FilterType) => 

    const onChangeHandler = (value: string | number)=> {

        changeListFilter({listID: listID, filter: value as FilterType})
    }



    return (
        <div className={s.mainWrapper}>
        <Segmented onChange={onChangeHandler} options={filterButtonsData} />

        </div>
    );
});


type PropsType = {
    listID: string
}