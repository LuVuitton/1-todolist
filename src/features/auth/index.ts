import * as authSelectors from './auth.selectors'
import {authActions, authReducer, authThunk} from './authReducer'
import {Login} from './Login'

const authActionsGroup = {
    ...authActions,
    ...authThunk

}


export {
    authSelectors,
    authReducer,
    authActionsGroup
}