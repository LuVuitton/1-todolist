import React, {FC, memo} from 'react';
import {FilterBtnDataType} from "../list/List";
import {v1} from "uuid";
import s from "../list/style.module.css";
import {useActions, useCustomSelector} from "../../customHooks";
import {selectListFilter} from "../list/lists.selectors";
import {listActionsGroup} from "../list";
import {FilterType} from "../../Types";


const filterButtonsData: FilterBtnDataType[] = [
    {id: v1(), title: 'all'},
    {id: v1(), title: 'active'},
    {id: v1(), title: 'completed'},
]


export const FilterBtns: FC<PropsType> = memo(({listID}) => {

    const listFilter = useCustomSelector(selectListFilter(listID))
    const {changeListFilter} = useActions(listActionsGroup)


    const changeListFilterHandler = (filter: FilterType) => changeListFilter({listID: listID, filter: filter})


    const mappedFilterBtn = filterButtonsData.map(e => {
        return (
            <button
                key={e.id}
                onClick={() => changeListFilterHandler(e.title)}
                className={listFilter === e.title ? s.btnFilter : ''}
            >
                {e.title}
            </button>
        );
    });

    return (
        <>
            {mappedFilterBtn}
        </>
    );
});


type PropsType = {
    listID: string
}