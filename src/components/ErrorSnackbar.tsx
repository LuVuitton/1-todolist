import React from 'react'
import Snackbar from '@mui/material/Snackbar/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert/Alert'
import { useCustomSelector, useActions } from "../customHooks";
import { appActionsGroup, appSelectors } from "../features/app";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})



export function ErrorSnackbar() {

    const appStatus = useCustomSelector(appSelectors.selectAppStatus)
    const errorMessage = useCustomSelector(appSelectors.selectErrorMessage)
    const { setAppStatus, setErrorMessage } = useActions(appActionsGroup)



    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setAppStatus({ appStatus: "idle" })
        setTimeout(() => { setErrorMessage({ errorMessage: null }) }, 1000)
    }


    return (
        <Snackbar
            open={appStatus === 'failed'}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ marginTop: '93px' }}
        >

            <Alert onClose={handleClose} severity='error'  >
                {errorMessage} 😐
            </Alert>

        </Snackbar>
    )
}
