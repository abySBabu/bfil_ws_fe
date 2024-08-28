import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, FormControlLabel, Snackbar, Alert, CircularProgress } from '@mui/material';
import { login } from '../../Services/loginService';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


interface ILoginFormInput {
    userName: string;
    password: string;
}
const defaultTheme = createTheme();

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormInput>();

    const onSubmit: SubmitHandler<ILoginFormInput> = async (value) => {
        setLoading(true);
        try {
            let data = {
                userName: value.userName,
                password: value.password,
            };

            const response = await login(data);
            console.log('Login Success:', response);
            if (response) {
                setSeverityColor("success");
                setMessage("Login successfully");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    navigate('/home');
                }, 3000);
            }

        } catch (error: any) {
            if (error?.response?.data?.message) {
                setSeverityColor("error");
                setMessage(error.response.data.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                }, 3000);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    md={8}
                    sx={{
                        backgroundImage: 'url(/images/loginBg.jpg)',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
                        <Avatar sx={{ m: 1, bgcolor: '#224a59' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box>
                            {/* <Typography component="h1" variant="h5">
                                Sign in
                            </Typography> */}
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
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: '#224a59' }}
                                >
                                    Sign In {loading ? <CircularProgress size={24} /> : null}
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default Login;
