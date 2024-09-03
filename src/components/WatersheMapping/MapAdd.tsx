import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Snackbar, Alert, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, FormControlLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { login } from '../../Services/loginService';
import { useNavigate } from 'react-router-dom';
import { allUserType, allRoles, selectOptions } from "../UserPage/UserManagementType";
import { getRolesByCompany, createUser } from '../../Services/userService';
import CircularProgress from '@mui/material/CircularProgress';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';

interface MapFormInput {
    ws_name: string,
    user: string,
    remarks: string
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
    const [userList, setUserList] = useState<allUserType[]>([]);
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
                let resp = await getRolesByCompany(companyID);
                if (resp) {
                    setRolesListFromService(resp);
                }
                let temp: allUserType[] = props.userList;
                if (props.action === "Add") {
                    let userListTemp = temp.filter(user => user.userBlockedFlag === "N")
                    const sorteduserList = userListTemp.sort((a: { userName: string; }, b: { userName: string; }) => {
                        if (a.userName < b.userName) return -1;
                        if (a.userName > b.userName) return 1;
                        return 0;
                    });

                    setUserList(sorteduserList);

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

    const { register, handleSubmit, formState: { errors } } = useForm<MapFormInput>();

    const addUser: SubmitHandler<MapFormInput> = async (value) => {
        setLoading(true);

    }

    return (
        <Container>
            <Dialog
                open={modalShow}
            >
                <DialogTitle>Add Watershed Mapping</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                id="user"
                                label="User Name"
                                {...register('user', {
                                    required: 'User Name Set is required'
                                })}
                                error={!!errors.user}
                                helperText={errors.user ? errors.user.message : ''}
                            >
                                {userList.map((option, index) => (<MenuItem key={index} value={option.userName}>{option.userName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                required
                                margin="normal"
                                fullWidth
                                id="ws_name"
                                label="Watershed Name"
                                {...register('ws_name', {
                                    required: 'Watershed Name Set is required'
                                })}
                                error={!!errors.ws_name}
                                helperText={errors.ws_name ? errors.ws_name.message : ''}
                            >
                                {rolesListFromService.map((option, index) => (<MenuItem key={index} value={option.roleName}>{option.roleName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="remarks"
                                label="Remarks"
                                autoFocus
                                {...register('remarks', {
                                    pattern: {
                                        value: /^[A-Za-z]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Remarks must only contain alphanumeric characters'
                                    }
                                })}
                                error={!!errors.remarks}
                                helperText={errors.remarks ? errors.remarks.message : ''}
                            />
                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(addUser)}>Add</Button>
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