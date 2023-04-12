import React from 'react'
import Snackbar from '@mui/material/Snackbar/Snackbar'
import MuiAlert, { AlertProps }  from '@mui/material/Alert/Alert'
import {useCustomSelector} from "../customHooks/CustomHooks";
import {
    GlobalErrorMessageType,
    GlobalRequestStatusType,
    setErrorMessageAC,
    setGlobalStatusAC
} from "../redux/reducers/globalReducer";
import {useDispatch} from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const status = useCustomSelector<GlobalRequestStatusType>(state => state.global.entityStatus)
    const errorMessage = useCustomSelector<GlobalErrorMessageType>(state => state.global.errorMessage)
    const dispatch = useDispatch()

    // const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        // setOpen(false)
        dispatch(setGlobalStatusAC({globalStatus:"idle"}))
        setTimeout(()=>{dispatch(setErrorMessageAC({errorMessage:null}))}, 1000)
    }


    return (
        <Snackbar open={status==='failed'} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {errorMessage} 😐
            </Alert>
        </Snackbar>
    )
}
