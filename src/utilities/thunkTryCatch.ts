import {appActions} from "../features/app/appReducer";
import {runDefaultCatch} from "./error-utilities";



export const thunkTryCatch = async (thunkAPI: any, logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI
    // dispatch(appActions.setAppStatus({appStatus: 'loading'}))
    try {
        return await logic()
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null)
    }
    finally {
        thunkAPI.dispatch(appActions.setAppStatus({appStatus: 'idle'}))
    }
}