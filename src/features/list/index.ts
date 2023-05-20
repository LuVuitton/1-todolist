import * as listSelectors from './lists.selectors'
import {listActions, listReducer, listsThunk} from './listReducers'
import {List} from './List'

const listActionsGroup = {
    ...listActions,
    ...listsThunk
}

export {
    listSelectors,
    listReducer,
    listActionsGroup,
    List
}

