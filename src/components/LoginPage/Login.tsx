import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Grid, Link, Paper, Snackbar, Alert, CircularProgress, Avatar } from '@mui/material';
import { login } from '../../Services/loginService';
import { useNavigate } from 'react-router-dom';
import { serverPath, setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { Height } from '@mui/icons-material';


interface ILoginFormInput {
    userName: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, trigger, formState: { errors, isValid }, watch } = useForm<ILoginFormInput>({
        mode: 'onChange',
        defaultValues: {
            userName: '',
            password: '',
        }
    });
    const formValues = watch();

    const onSubmit: SubmitHandler<ILoginFormInput> = async (value) => {
        setLoading(true);
        try {
            let data = {
                userName: value.userName,
                password: value.password,
                companyId: serverPath.companyID,
            };

            const response = await login(data);
            if (response) {
                setSeverityColor("success");
                setMessage("Login successfully");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    navigate('/home');
                }, setTimeoutsecs);
            }

        } catch (error: any) {
            if (error?.response?.data?.message) {
                setSeverityColor("error");
                setMessage(error.response.data.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                }, setAutoHideDurationTimeoutsecs);
            }
        }
    };

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    md={8}
                    sx={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/loginBg.jpg)`,
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} md={4} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt='Pragat' style={{ height: '100px', width: '100px', objectFit: 'cover' }} />
                        <Box>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="userName"
                                    label="UserName"
                                    autoComplete="userName"
                                    autoFocus
                                    {...register('userName', {
                                        required: 'UserName is required',
                                        pattern: {
                                            value: /^[A-Za-z0-9]+$/,
                                            message: 'UserName must only contain alphanumeric characters'
                                        }
                                    })}
                                    onChange={(e) => {
                                        register('userName').onChange(e);
                                        trigger('userName');
                                    }}
                                    error={!!errors.userName}
                                    helperText={errors.userName ? errors.userName.message : ''}
                                />
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
                                    onChange={(e) => {
                                        register('password').onChange(e);
                                        trigger('password');
                                    }}
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={loading || !formValues.userName || !formValues.password}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In {loading ? <CircularProgress /> : null}
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Button variant='text' onClick={() => navigate('/forgotpassword')}>
                                            Forgot password?
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;
