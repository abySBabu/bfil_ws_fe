import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    TextField, Button, Snackbar, Alert, Box, Grid, MenuItem, Dialog, DialogActions,
    DialogContent, DialogTitle, Container, CircularProgress
} from '@mui/material';
import { getRolesByCompany, updateUserDetails } from '../../Services/userService';
import { allUserType, allRoles, selectOptions } from "./UserManagementType";


interface UserFormInput {
    userName: string;
    employeeCode: string;
    designation: string;
    role: string;
    userType: string;
    email: string;
    mobileNo: string;
    password: string;
    manager: string;
    loginType: string;
}

interface UserTypeOption {
    id: number;
    value: any; // Replace 'any' with the specific type of 'value' if known
}

type userTypeProps = {
    show: boolean;
    hide: () => void;
    action: string;
    userDetails?: allUserType;
    userList: allUserType[];
}
export default function UserForm(props: userTypeProps) {
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    const [rolesListFromService, setRolesListFromService] = useState<allRoles[]>([]);
    const [userTypeOptions, setUserTypeOptions] = useState<UserTypeOption[]>([]);
    const [managerList, setManagerList] = useState<allUserType[]>([]);
    const loginTypeOptions = selectOptions.loginTypeOptions;
    let userId: any;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserFormInput>(
        {
            defaultValues: {
                userName: '',
                employeeCode: '',
                designation: '',
                role: '',
                userType: '',
                email: '',
                mobileNo: '',
                manager: '',
                password: '',
                loginType: '',
            }
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getRolesByCompany();
                if (resp) setRolesListFromService(resp);

                const managerListTemp = props.userList.filter(user => user.userBlockedFlag === "N")
                    .sort((a, b) => a.userName.localeCompare(b.userName));

                setManagerList(managerListTemp);
            } catch (error) {
                console.log(error);
            }
        };

        const setUserFeatureList = () => {
            const featuresString = sessionStorage.getItem("features");
            const features = featuresString ? featuresString.split(',') : [];
            const featuresWithIdAndValue = features.map((feature, i) => ({ id: i, value: feature }));
            setUserTypeOptions(featuresWithIdAndValue);
        };

        setUserFeatureList();
        fetchData();

        // Set form values if editing
        if (props.userDetails) {
            setTimeout(() => {
                setValue('userName', props.userDetails?.userName || '');
                setValue('employeeCode', props.userDetails?.userCode || '');
                setValue('designation', props.userDetails?.userDesignation || '');
                setValue('role', props.userDetails?.userRoleList?.[0]?.roleName || '');
                setValue('userType', props.userDetails?.userType || '');
                setValue('email', props.userDetails?.userEmailId || '');
                setValue('mobileNo', props.userDetails?.mobileNumber || '');
                setValue('password', props.userDetails?.userPassword || '');
                setValue('manager', props.userDetails?.managerName || '');
                const defaultLoginType = loginTypeOptions.find(option => option.id === props.userDetails?.loginType)?.value || '';
                setValue('loginType', defaultLoginType);
            }, 0);
        }
    }, [props.userDetails, props.action, setValue]);

    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const addUser: SubmitHandler<UserFormInput> = async (value) => {
        setLoading(true);
        try {
            let userTypeTemp = value.userType;
            let loginTypeTemp = loginTypeOptions.find(option => option.value === value.loginType)?.id;
            let roleListTemp = rolesListFromService.filter(option => option.roleName === value.role);
            let currentUser = props.userList.find(user => (user.userId).toString() === sessionStorage.getItem("userId"));
            let userCreatDataOne = {
                userEmailId: value.email,
                userPassword: value.password,
                userName: value.userName,
                userCode: value.employeeCode,
                userDesignation: value.designation,
                userRoleList: roleListTemp,
                userCompanyList: currentUser?.userCompanyList || [],
                managerName: value.manager,
                mobileNumber: value.mobileNo,
                updatedByUserId: userId,
                userType: userTypeTemp,
                loginType: loginTypeTemp
            }

            let resp = await updateUserDetails(userCreatDataOne, props.userDetails?.userId);
            if (resp) {
                setSeverityColor("success");
                setMessage("User updated successfully");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
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
    }


    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('role', event.target.value);
    };

    const handleManagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('manager', event.target.value);
    };

    return (
        <Container>
            <Dialog open={modalShow}>
                <DialogTitle>Edit User</DialogTitle>
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
                                {...register('userName', { required: 'UserName is required' })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="employeeCode"
                                label="Employee Code"
                                autoComplete="employeeCode"
                                {...register('employeeCode', { required: 'Employee Code is required' })}
                                error={!!errors.employeeCode}
                                helperText={errors.employeeCode?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="designation"
                                label="Designation"
                                {...register('designation', { required: 'Designation is required' })}
                                error={!!errors.designation}
                                helperText={errors.designation?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="role"
                                label="Role"
                                value={watch('role')}
                                {...register('role', {
                                    required: 'Role is required'
                                })}
                                error={!!errors.role}
                                helperText={errors.role?.message}
                            >
                                {rolesListFromService.map((option, index) => (
                                    <MenuItem key={index} value={option.roleName}>{option.roleName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                value={watch('userType')}
                                id="userType"
                                label="User Type"
                                {...register('userType', { required: 'User Type is required' })}
                                error={!!errors.userType}
                                helperText={errors.userType?.message}
                            >
                                {userTypeOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.value}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="email"
                                label="Email"
                                {...register('email', { required: 'Email is required' })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="mobileNo"
                                label="Mobile Number"
                                {...register('mobileNo', { required: 'Mobile Number is required' })}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                value={watch('manager')}
                                id="manager"
                                label="Manager"
                                {...register('manager', { required: 'Manager is required' })}
                                error={!!errors.manager}
                                helperText={errors.manager?.message}
                            >
                                {managerList.map((option, index) => (
                                    <MenuItem key={index} value={option.userName}>{option.userName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="loginType"
                                value={watch('loginType')}
                                label="Login Type"
                                {...register('loginType', { required: 'Login Type is required' })}
                                error={!!errors.loginType}
                                helperText={errors.loginType?.message}
                            >
                                {loginTypeOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.value}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit(addUser)} color="primary">
                    Update User {loading ? <CircularProgress size={24} /> : null}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
