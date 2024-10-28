import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    TextField, Button, Snackbar, Alert, Box, Grid, MenuItem, Dialog, DialogActions,
    DialogContent, DialogTitle, Container, CircularProgress
} from '@mui/material';
import { getRolesByCompany, updateUserDetails } from '../../Services/userService';
import { allUserType, allRoles, selectOptions } from "./UserManagementType";
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { useTranslation } from 'react-i18next';
interface UserFormInput {
    userName: string;
    employeeCode: string;
    designation: string;
    role: string;
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
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    const [rolesListFromService, setRolesListFromService] = useState<allRoles[]>([]);
    const [userTypeOptions, setUserTypeOptions] = useState<UserTypeOption[]>([]);
    const [managerList, setManagerList] = useState<allUserType[]>([]);
    const loginTypeOptions = selectOptions.loginTypeOptions;
    let companyId = parseInt(sessionStorage.getItem("companyId") || '0');
    let userId: any;
    const [isRolesLoading, setRolesLoading] = useState(true);

    const { register, handleSubmit, trigger, setValue, watch, formState: { errors, isValid } } = useForm<UserFormInput>(
        {
            defaultValues: {
                userName: '',
                employeeCode: '',
                designation: '',
                role: '',
                email: '',
                mobileNo: '',
                manager: '',
                password: '',
                loginType: '',
            }
        });
    const formValues = watch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getRolesByCompany(companyId);
                if (resp) setRolesListFromService(resp);
                setRolesLoading(false);
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
                loginType: loginTypeTemp
            }

            let resp = await updateUserDetails(userCreatDataOne, props.userDetails?.userId);
            if (resp) {
                setSeverityColor("success");
                setMessage(t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
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
                <DialogTitle>{t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Edit_User_Label")}</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Name")}
                                autoFocus
                                InputLabelProps={{ shrink: true }}
                                {...register('userName', {
                                    // required: 'Name is required',
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Name must only contain alphanumeric characters'
                                    }
                                })}
                                onChange={(e) => {
                                    register('userName').onChange(e);
                                    trigger('userName');
                                }}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                id="employeeCode"
                                InputLabelProps={{ shrink: true }}
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Employee_Code")}
                                {...register('employeeCode', {
                                    // required: 'Employee Code is required',
                                })}
                                onChange={(e) => {
                                    register('employeeCode').onChange(e);
                                    trigger('employeeCode');
                                }}
                                error={!!errors.employeeCode}
                                helperText={errors.employeeCode?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="designation"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Designation")}
                                InputLabelProps={{ shrink: true }}
                                {...register('designation', {
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Designation must only contain alphanumeric characters'
                                    }
                                })}
                                onChange={(e) => {
                                    register('designation').onChange(e);
                                    trigger('designation');
                                }}
                                error={!!errors.designation}
                                helperText={errors.designation?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                disabled
                                id="email"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Email")}
                                {...register('email', {
                                    // required: 'Email is required' 
                                })}
                                onChange={(e) => {
                                    register('email').onChange(e);
                                    trigger('email');
                                }}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                InputLabelProps={{ shrink: true }}
                                id="mobileNo"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Mobile_Number")}
                                {...register('mobileNo', {
                                    // required: 'Mobile Number is required'
                                })}
                                onChange={(e) => {
                                    register('mobileNo').onChange(e);
                                    trigger('mobileNo');
                                }}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                required
                                margin="normal"
                                fullWidth
                                id="role"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Role")}
                                InputLabelProps={{ shrink: true }}
                                value={watch('role')}
                                {...register('role', {
                                    // required: 'Role is required'
                                })}
                                onChange={(e) => {
                                    register('role').onChange(e);
                                    trigger('role');
                                }}
                                error={!!errors.role}
                                helperText={errors.role?.message}
                            >
                                {rolesListFromService.map((option, index) => (
                                    <MenuItem key={index} value={option.roleName}>{option.roleName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={watch('manager')}
                                id="manager"
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Select_Manager")}
                                {...register('manager', {})}
                                onChange={(e) => {
                                    register('manager').onChange(e);
                                    trigger('manager');
                                }}
                                error={!!errors.manager}
                                helperText={errors.manager?.message}
                            >
                                {managerList.map((option, index) => (
                                    <MenuItem key={index} value={option.userName}>{option.userName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                required
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                id="loginType"
                                value={watch('loginType')}
                                label={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Login_type")}
                                {...register('loginType', {
                                    // required: 'Login Type is required'
                                })}
                                onChange={(e) => {
                                    register('loginType').onChange(e);
                                    trigger('loginType');
                                }}
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
                    <Button onClick={handleClose} disabled={loading}>{t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Cancel_Button")}</Button>
                    <Button
                        disabled={loading || !isValid || !formValues.email || !formValues.employeeCode || !formValues.loginType || !formValues.mobileNo || !formValues.role || !formValues.userName}
                        onClick={handleSubmit(addUser)}>
                        {t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Update_Button")}{loading ? <CircularProgress /> : null}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
