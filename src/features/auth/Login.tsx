import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {authActionsGroup, authSelectors} from "./";
import {useActions,useCustomSelector} from "../../customHooks";



export const Login = () => {

const {login} = useActions(authActionsGroup)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            //Partial<someType> говорим ято обьект будет типа  someType, но у которого все поля не обязательные
            const errors: FormikErrorType = {}
            if (!values.email && !formik.touched) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit:  (values:FormikValuesType) => {
                login({data:values})

                   // formik.resetForm()
           },
    })



    const isLoading = useCustomSelector(authSelectors.selectIsLoading)
    if (isLoading){

        return <Navigate to='/'/>
    }




    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email? <div style={{color:"red"}}>{formik.errors.email}</div>:null }
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.email && formik.errors.password? <div style={{color:"red"}}>{formik.errors.password}</div>:null }

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox   //добавлять в чекбокс
                                {...formik.getFieldProps('rememberMe')}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}


type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

type FormikErrorType = Partial<FormikValuesType>