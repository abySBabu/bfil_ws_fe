import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Snackbar, Alert, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, FormControlLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { login } from '../../Services/loginService';
import { useNavigate } from 'react-router-dom';
import { allUserType, allRoles, selectOptions } from "./UserManagementType";
import { getRolesByCompany, createUser } from '../../Services/userService';
import CircularProgress from '@mui/material/CircularProgress';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';

interface UserFormInput {
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
    isLiveLocationNeeded: string,

}

interface UserTypeOption {
    id: number;
    value: any; // You can replace 'any' with the specific type of 'value' if you know it
}

export default function (props: userTypeProps) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const locationNeededOptions = selectOptions.locationNeededOptions;
    const [modalShow, setModalShow] = useState(props.show);
    const [rolesListFromService, setRolesListFromService] = useState<allRoles[]>([]);
    const featuresString = sessionStorage.getItem("features");
    const features = featuresString ? featuresString.split(',') : [];
    const [userTypeOptions, setUserTypeOptions] = useState<UserTypeOption[]>([]);
    const [managerList, setManagerList] = useState<allUserType[]>([]);
    const loginTypeOptions = selectOptions.loginTypeOptions;
    let companyID: any;
    let userId: any;
    const companyIdFromLocalStorage = sessionStorage.getItem("companyId");
    const userIdFromLocalStorage = sessionStorage.getItem("userId");

    if (companyIdFromLocalStorage !== null) {
        companyID = parseInt(companyIdFromLocalStorage);
    }
    if (userIdFromLocalStorage !== null) {
        userId = parseInt(userIdFromLocalStorage);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resp = await getRolesByCompany();
                if (resp) {
                    setRolesListFromService(resp);
                }
                let temp: allUserType[] = props.userList;
                if (props.action === "Add") {
                    let managerListTemp = temp.filter(user => user.userBlockedFlag === "N")
                    const sorteduserList = managerListTemp.sort((a: { userName: string; }, b: { userName: string; }) => {
                        if (a.userName < b.userName) return -1;
                        if (a.userName > b.userName) return 1;
                        return 0;
                    });

                    setManagerList(sorteduserList);

                }
            } catch (error) {
                console.log(error)
            }
        };
        const setUserFeatureList = () => {
            const featuresWithIdAndValue = [];
            for (let i = 0; i < features?.length; i++) {
                const feature = {
                    id: i,
                    value: features[i]
                };
                featuresWithIdAndValue.push(feature);
            }
            if (featuresWithIdAndValue.length > 1) {
                const featureTemp = {
                    id: 3,
                    value: featuresWithIdAndValue[0].value + "," + featuresWithIdAndValue[1].value
                };
                featuresWithIdAndValue.push(featureTemp);
            }
            setUserTypeOptions(featuresWithIdAndValue);

        }
        setUserFeatureList();
        fetchData();
    }, []);

    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const { register, handleSubmit, formState: { errors } } = useForm<UserFormInput>();

    const addUser: SubmitHandler<UserFormInput> = async (value) => {
        setLoading(true);
        try {
            // let userTypeTemp = userTypeOptions.find(option => option.value === userType)?.id;
            let userTypeTemp = value.userType;
            let loginTypeTemp = loginTypeOptions.find(option => option.value === value.loginType)?.id;
            let roleListTemp = rolesListFromService.filter(option => option.roleName === value.role);
            let tempList: allUserType[] = props.userList;
            let currentUser: allUserType[] = tempList.filter(user => (user.userId).toString() === sessionStorage.getItem("userId"));
            let userCreatDataOne = {
                userEmailId: value.email,
                userPassword: value.password,
                userName: value.userName,
                userCode: value.employeeCode,
                userDesignation: value.designation,
                userRoleList: roleListTemp,
                userCompanyList: currentUser[0].userCompanyList,
                managerName: value.manager,
                mobileNumber: value.mobileNo,
                createdByUserId: userId,
                userType: userTypeTemp,
                loginType: loginTypeTemp
            }
            console.log("adduser.........", userCreatDataOne)

            let resp = await createUser(userCreatDataOne);
            if (resp) {
                setSeverityColor("success");
                setMessage("User created successfully");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
                }, setTimeoutsecs);
            }
        } catch (error: any) {
            if (error && error.response && error.response.data && error.response.data.message) {
                setSeverityColor("error");
                setMessage(error.response.data.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                }, setAutoHideDurationTimeoutsecs)
            }
        }
    }

    return (
        <Container>
            <Dialog
                open={modalShow}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="employeeCode"
                                label="Employee Code"
                                autoComplete="employeeCode"
                                {...register('employeeCode', {
                                    required: 'Employee Code is required'
                                })}
                                error={!!errors.employeeCode}
                                helperText={errors.employeeCode ? errors.employeeCode.message : ''}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="designation"
                                label="Designation"
                                autoComplete="designation"
                                {...register('designation', {
                                    required: 'Designation is required'
                                })}
                                error={!!errors.designation}
                                helperText={errors.designation ? errors.designation.message : ''}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="role"
                                label="Role"
                                autoComplete="role"
                                {...register('role', {
                                    required: 'Role Set is required'
                                })}
                                error={!!errors.role}
                                helperText={errors.role ? errors.role.message : ''}
                            >
                                {rolesListFromService.map((option, index) => (<MenuItem key={index} value={option.roleName}>{option.roleName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="userType"
                                label="User Type"
                                autoComplete="userType"
                                {...register('userType', {
                                    required: 'User Type is required'
                                })}
                                error={!!errors.userType}
                                helperText={errors.userType ? errors.userType.message : ''}
                            >
                                {userTypeOptions.map((option, index) => (<MenuItem key={index} value={option.value}>{option.value}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="email"
                                {...register('email', {
                                    required: 'Email is required'
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="mobileNo"
                                label="Mobile Number"
                                autoComplete="mobileNo"
                                {...register('mobileNo', {
                                    required: 'Mobile Number is required'
                                })}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo ? errors.mobileNo.message : ''}
                            />
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="manager"
                                label="Manager"
                                autoComplete="manager"
                                {...register('manager', {
                                    required: 'Manager is required'
                                })}
                                error={!!errors.manager}
                                helperText={errors.manager ? errors.manager.message : ''}
                            >
                                {managerList.map((option, index) => (<MenuItem key={index} value={option.userName}>{option.userName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="loginType"
                                label="Login Type"
                                autoComplete="loginType"
                                {...register('loginType', {
                                    required: 'Login Type is required'
                                })}
                                error={!!errors.loginType}
                                helperText={errors.loginType ? errors.loginType.message : ''}
                            >
                                {loginTypeOptions.map((option, index) => (<MenuItem key={index} value={option.value}>{option.value}</MenuItem>))}
                            </TextField>
                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(addUser)}>Add User</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={severityColor}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

type userTypeProps = {
    show: boolean;
    hide: () => void;
    action: string;
    userDetails?: allUserType;
    userList: allUserType[];
}