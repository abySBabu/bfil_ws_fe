import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Snackbar, Alert, Box, Typography, Container, Grid, Link, Paper, Avatar, CssBaseline, Divider, FormControlLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { login } from '../../Services/loginService';
import { useNavigate } from 'react-router-dom';
import { allUserType, allRoles, selectOptions } from "../UserPage/UserManagementType";
import { getRolesByCompany, createUser } from '../../Services/userService';
import { listWS } from '../../Services/wsService';
import CircularProgress from '@mui/material/CircularProgress';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';

interface MapFormInput {
    ws_name: number,
    user: number,
    remarks: string
}

interface UserTypeOption {
    id: number;
    value: any; // You can replace 'any' with the specific type of 'value' if you know it
}
interface wsData {
    wsId: number,
    wsName: string,
    wsDescription: string,
    villageId: number,
    mapLink: string
}

export default function (props: userTypeProps) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const locationNeededOptions = selectOptions.locationNeededOptions;
    const [modalShow, setModalShow] = useState(props.show);
    const [wsList, setWsList] = useState<wsData[]>([]);
    const [selectedWs, setSelectedWs] = useState<wsData | null>(null);
    const featuresString = sessionStorage.getItem("features");
    const features = featuresString ? featuresString.split(',') : [];
    const [userTypeOptions, setUserTypeOptions] = useState<UserTypeOption[]>([]);
    const [userList, setUserList] = useState<allUserType[]>([]);
    const loginTypeOptions = selectOptions.loginTypeOptions;
    let companyID: any;
    let userId: any;
    const companyIdFromLocalStorage = sessionStorage.getItem("companyId");
    const userIdFromLocalStorage = sessionStorage.getItem("userId");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<MapFormInput>();


    if (companyIdFromLocalStorage !== null) {
        companyID = parseInt(companyIdFromLocalStorage);
    }
    if (userIdFromLocalStorage !== null) {
        userId = parseInt(userIdFromLocalStorage);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resp = await listWS();
                if (resp) {
                    setWsList(resp);
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

    const handleWatershedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedWsId = Number(event.target.value);
        setValue('ws_name', selectedWsId);  // Set watershed id

        // Find the selected watershed from the list and update the state
        const selectedWsData = wsList.find(ws => ws.wsId === selectedWsId) || null;
        setSelectedWs(selectedWsData);
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUserId = Number(event.target.value);
        setValue('user', selectedUserId);  // Set user id
    };

    const addUser: SubmitHandler<MapFormInput> = async (value) => {
        console.log('value', value)
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
                                onChange={handleUserChange}
                            >
                                {userList.map((option, index) => (<MenuItem key={index} value={option.userId}>{option.userName}</MenuItem>))}
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
                                onChange={handleWatershedChange}
                            >
                                {wsList.map((option, index) => (<MenuItem key={index} value={option.wsId}>{option.wsName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <Divider textAlign="left">Watershed Details</Divider>
                        </Grid>
                        <Grid item xs={4}><TextField label='Description' disabled value={selectedWs?.wsDescription} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={4}><TextField label='State' disabled value={selectedWs?.villageId} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={4}><TextField label='District' disabled value={selectedWs?.villageId} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={4}><TextField label='Taluka' disabled value={selectedWs?.villageId} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={4}><TextField label="Grampanchayat" disabled value={selectedWs?.villageId} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={4}><TextField label="Village" disabled value={selectedWs?.villageId} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12}><Divider /></Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
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