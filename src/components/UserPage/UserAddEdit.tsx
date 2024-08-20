import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { login } from '../../Services/loginService';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { allUserType, selectOptions } from "../UserPage/UserManagementType";


interface ILoginFormInput {
    userName: string;
    employeeCode: string,
    designation: string,
    skillSet: string,
    role: string,
    userType: string,
    email: string,
    mobileNo: string,
    password: string;
    manager: string,
    loginType: string,

}
const defaultTheme = createTheme();

export default function (props: userTypeProps) {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(props.show);


    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormInput>();

    const onSubmit: SubmitHandler<ILoginFormInput> = async (value) => {
        try {
            let data = {
                userName: value.userName,
                password: value.password,
            };

            const response = await login(data);
            navigate('/home');
            console.log('Login Success:', response);

        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <Dialog
            open={modalShow}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <Box component={Grid} container spacing={2} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="userName"
                            label="Name"
                            autoComplete="userName"
                            autoFocus
                            {...register('userName', {
                                required: 'UserName is required'
                            })}
                            error={!!errors.userName}
                            helperText={errors.userName ? errors.userName.message : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="employeeCode"
                            label="Employee Code"
                            autoComplete="employeeCode"
                            autoFocus
                            {...register('employeeCode', {
                                required: 'Employee Code is required'
                            })}
                            error={!!errors.employeeCode}
                            helperText={errors.employeeCode ? errors.employeeCode.message : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 4,
                                    message: 'Password must be at least 4 characters',
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    </Grid>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

type userTypeProps = {
    show: boolean;
    hide: () => void;
    action: string;
    userDetails?: allUserType;
    userList: allUserType[];
}