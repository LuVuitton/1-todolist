import React, {FC, memo, useCallback} from 'react';
import {EditableSpan} from "../../components/reusedComponents/EditableSpan/EditableSpan";
import {useActions, useCustomSelector} from "../../customHooks";
import {listActionsGroup} from "../list";
import s from '/style.module.css'
import {selectListTitle} from "../list/lists.selectors";


export const ListTitle: FC<PropsType> = memo(({listID}) => {
    const listTitle = useCustomSelector(selectListTitle(listID))
    const {updateListTitle} = useActions(listActionsGroup)


    const updateListTitleHandler = useCallback((title: string) => {
         updateListTitle({listID: listID, title: title})
    }, [])


    return (
        <>
            <h3>
                <EditableSpan value={listTitle} callback={updateListTitleHandler} itemID={listID}/>
            </h3>
        </>
    );
})


type PropsType = {
    listID: string
}

