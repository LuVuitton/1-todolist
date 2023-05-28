import { ExportOutlined } from '@ant-design/icons';
import { InputAdd } from "./../../components/reusedComponents/inputAdd/InputAdd";
import { Button } from 'antd';
import { authActionsGroup, authSelectors } from "./../auth";
import { useActions, useCustomSelector } from '../../customHooks';
import { listActionsGroup } from '../list';
import s from './style.module.css'
import { appSelectors } from '../app';
import { LineLoader } from '../../components/reusedComponents/Loaders/LineLoader';









export const Header = () => {

    const { logout } = useActions(authActionsGroup)
    const { addListAndEmptyTasks } = useActions(listActionsGroup)
    const isLoggedIn = useCustomSelector(authSelectors.selectIsLoading)
    const appStatus = useCustomSelector(appSelectors.selectAppStatus)




    const addList = (inputValue: string) => {
        return addListAndEmptyTasks(inputValue).unwrap()
    }
    const exitHandler = () => logout({})



    return (
        <div className={s.headerMainWrapper}>
            <div className={s.headerLoaderWrapper}>
                {
                    appStatus === 'loading' && <LineLoader />
                }
            </div>
            <div className={s.headerWrapper}>

                <div className={s.inputAddWrapper}>

                    <InputAdd instance='List' placeholder={'create new list here'} disabled={!isLoggedIn} clickToAdd={addList} />
                </div>


                <div className={s.btnExitWrapper}>
                    <Button onClick={exitHandler}><ExportOutlined rev='Button' /></Button>
                </div>


            </div>
        </div>
    )

}