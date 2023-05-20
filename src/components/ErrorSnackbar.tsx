import React from 'react'
import Snackbar from '@mui/material/Snackbar/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert/Alert'
import {useCustomSelector, useBoundDispatch} from "../customHooks";
import {appActionsGroup, appSelectors} from "../features/app";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const globalEntityStatus = useCustomSelector(appSelectors.selectGlobalEntityStatus)
    const errorMessage = useCustomSelector(appSelectors.selectErrorMessage)
    const {setAppStatus,setErrorMessage} = useBoundDispatch(appActionsGroup)


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        // setOpen(false)
        setAppStatus({appStatus:"idle"})
        setTimeout(()=>{setErrorMessage({errorMessage:null})}, 1000)
    }


    return (
        <Snackbar open={globalEntityStatus==='failed'} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {errorMessage} 😐
            </Alert>
        </Snackbar>
    )
}
