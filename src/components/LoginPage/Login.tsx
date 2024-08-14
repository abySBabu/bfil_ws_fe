import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, FormControlLabel } from '@mui/material';
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

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormInput>();

    const onSubmit: SubmitHandler<ILoginFormInput> = async (value) => {
        try {
            let data = {
                userName: value.userName,
                password: value.password,
            };

            const response = await login(data);
            navigate('/dashboard');
            console.log('Login Success:', response);

        } catch (error) {
            console.error('Login Error:', error);
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
                        <Box

                        >
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
                                        required: 'UserName is required'
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
                                    href="/home"
                                >
                                    Sign In
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
        </ThemeProvider>
    );
};

export default Login;
