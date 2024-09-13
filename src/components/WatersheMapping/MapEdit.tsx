import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    TextField, Button, Snackbar, Alert, Box, Typography, Container, Grid, Link, Paper, Avatar,
    CssBaseline, Divider, FormControlLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, Select, OutlinedInput
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allUserType, allRoles, selectOptions } from "../UserPage/UserManagementType";
import { mapDataType, wsData } from "./WatershedMappingMgmtType";
import { addWS } from '../../Services/wsMappingService';
import { listWS } from '../../Services/wsService';
import { usersList } from '../../Services/userService'
import CircularProgress from '@mui/material/CircularProgress';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { SelectChangeEvent } from '@mui/material/Select';
import { StateName, DistrictName, TalukName, PanName, VillageName } from '../../LocName';

interface MapFormInput {
    ws_name: number,
    user: number,
    remarks: string
}
export default function (props: mapTypeProps) {
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    const [wsList, setWsList] = useState<wsData[]>([]);
    const [selectedWs, setSelectedWs] = useState<wsData | null>(null);
    const [userList, setUserList] = useState<allUserType[]>([]);
    const [selectedRoleName, setSelectedRoleName] = useState<string>('');
    let companyID: any;
    let userId: any;
    const companyIdFromLocalStorage = sessionStorage.getItem("companyId");
    const userIdFromLocalStorage = sessionStorage.getItem("userId");
    let companyId = parseInt(sessionStorage.getItem("companyId") || '0');

    const { register, handleSubmit, setValue, trigger, watch, formState: { errors, isValid } } = useForm<MapFormInput>(
        {
            defaultValues: {
                ws_name: undefined,
                user: undefined,
                remarks: '',
            }
        });
    const formValues = watch();


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
                let userResp = await usersList(companyId);
                let temp: allUserType[] = userResp;
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

        fetchData();
    }, []);

    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const handleWatershedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const selectedWsIds = Number(e.target.value);
        setValue('ws_name', selectedWsIds);
        const selectedWsData = wsList.find(ws => ws.wsId === selectedWsIds) || null;
        // const selectedWsData = wsList.filter(ws => selectedWsIds.includes(ws.wsId));
        setSelectedWs(selectedWsData);
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const selectedUserId = Number(e.target.value);
        setValue('user', selectedUserId);
        const selectedUser = userList.find(user => user.userId === selectedUserId);
        if (selectedUser) {
            setSelectedRoleName(selectedUser.userRoleList[0]?.roleName || '');
        }
    };

    const addMap: SubmitHandler<MapFormInput> = async (value) => {
        setLoading(true);
        try {
            let mapData = {
                userId: value.user,
                watershedId: value.ws_name,
                createdUser: userId,
                updatedUser: userId,
                remarks: value.remarks,
            }
            console.log("mapData.........", mapData)

            let resp = await addWS(mapData);
            if (resp) {
                setSeverityColor("success");
                setMessage("WaterShed mapping created successfully");
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
                <DialogTitle>Add Watershed Mapping</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="user"
                                label="User Name"
                                {...register('user', {
                                    // required: 'User Name is required'
                                })}
                                onChange={(e) => {
                                    register('user').onChange(e);
                                    trigger('user');
                                    handleUserChange(e);
                                }}
                                error={!!errors.user}
                                helperText={errors.user ? errors.user.message : ''}
                            >
                                {userList.map((option, index) => (<MenuItem key={index} value={option.userId}>{option.userName}</MenuItem>))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                label="Role"
                                value={selectedRoleName}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                required
                                margin="normal"
                                fullWidth
                                id="ws_name"
                                label="Watershed Name"
                                {...register('ws_name', {
                                    // required: 'Watershed Name Set is required'
                                })}
                                onChange={(e) => {
                                    register('ws_name').onChange(e);
                                    trigger('ws_name');
                                    handleWatershedChange(e);
                                }}
                                error={!!errors.ws_name}
                                helperText={errors.ws_name ? errors.ws_name.message : ''}
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
                                id="remarks"
                                label="Remarks"
                                autoFocus
                                {...register('remarks', {
                                    pattern: {
                                        value: /^[A-Za-z]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Remarks must only contain alphanumeric characters'
                                    }
                                })}
                                onChange={(e) => {
                                    register('remarks').onChange(e);
                                    trigger('remarks');
                                    handleWatershedChange(e);
                                }}
                                error={!!errors.remarks}
                                helperText={errors.remarks ? errors.remarks.message : ''}
                            />
                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading || !isValid || !formValues.ws_name || !formValues.user} onClick={handleSubmit(addMap)}>Add{loading ? <CircularProgress size={24} /> : null}</Button>
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


type mapTypeProps = {
    show: boolean;
    hide: () => void;
    action: string;
    mapDetails: mapDataType;
    mapList: mapDataType[];
}