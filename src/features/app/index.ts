import * as appSelectors from './app.selectors'
import {appReducer, appActions} from './appReducer'
import {App} from './App'

const appActionsGroup = {
    ...appActions
}
export {
    appSelectors,
    appReducer,
    appActionsGroup,
    App
}