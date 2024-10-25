import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    TextField, Button, Snackbar, Alert, Box, Typography, Container, Grid, Link, Paper, Avatar,
    CssBaseline, Divider, FormControlLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Checkbox,
    DialogTitle, FormControl, InputLabel, Select, OutlinedInput, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allUserType, allRoles, selectOptions } from "../UserPage/UserManagementType";
import { mapDataType, wsData } from "./WatershedMappingMgmtType";
import { addWS, editWS } from '../../Services/wsMappingService';
import { listWS } from '../../Services/wsService';
import { usersList, getRolesByCompany } from '../../Services/userService'
import CircularProgress from '@mui/material/CircularProgress';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { SelectChangeEvent } from '@mui/material/Select';
import { StateName, DistrictName, TalukName, PanName, VillageName } from '../../LocName';
import { useTranslation } from 'react-i18next';

interface MapFormInput {
    ws_name: number[],
    user: number,
    remarks: string
}
export default function (props: mapTypeProps) {
    const { t } = useTranslation();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [rolesListFromService, setRolesListFromService] = useState<allRoles[]>([]);
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    const [wsList, setWsList] = useState<wsData[]>([]);
    const [selectedWs, setSelectedWs] = useState<wsData[]>([]);
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
                ws_name: [],
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
                let Roleresp = await getRolesByCompany(companyID);
                if (Roleresp) {
                    setRolesListFromService(Roleresp);
                }
                let resp = await listWS();
                if (resp.status === 'success') {
                    setWsList(resp.data);
                }
                let userResp = await usersList(companyId);
                let temp: allUserType[] = userResp;
                if (props.action === "Edit") {
                    let userListTemp = temp.filter(user => user.userBlockedFlag === "N")
                    const sorteduserList = userListTemp.sort((a: { userName: string; }, b: { userName: string; }) => {
                        if (a.userName < b.userName) return -1;
                        if (a.userName > b.userName) return 1;
                        return 0;
                    });

                    // const filterUser = sorteduserList.filter(user => !user.userRoleList.some(role => role.roleName === 'Community Resource person'))
                    setUserList(sorteduserList);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [props.action, props.mapDetails, setValue]);

    useEffect(() => {
        if (props.action === "Edit" && props.mapDetails && userList.length > 0 && wsList.length > 0) {
            const wsIdArray = props.mapDetails.watershedId.split(',').map(Number);
            setValue('ws_name', wsIdArray);

            const selectedWsData = wsList.filter(ws => wsIdArray.includes(ws.wsId));
            setSelectedWs(selectedWsData);

            setValue('remarks', props.mapDetails.remarks);
            setValue('user', props.mapDetails.userId);
            const selectedUser = userList.find(user => user.userId === props.mapDetails.userId);
            if (selectedUser) {
                setSelectedRoleName(selectedUser.userRoleList[0]?.roleName || '');
            }
        }
    }, [props.action, props.mapDetails, userList, wsList, setValue]);


    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    function fetchUserData(userid: number) {
        const user = userList.find(user => user.userId === userid);
        return user ? user.userName : null;

    };

    const handleWatershedChange = (event: SelectChangeEvent<number[] | number>) => {
        const value = event.target.value;

        if (selectedRoleName === 'Community Resource person') {
            // Single selection
            setValue('ws_name', [value as number]); // wrap in an array for consistency
            const selectedWsData = wsList.filter(ws => ws.wsId === value);
            setSelectedWs(selectedWsData);
        } else {
            // Multiple selection
            const selectedWsIds = value as number[];
            setValue('ws_name', selectedWsIds);
            const selectedWsData = wsList.filter(ws => selectedWsIds.includes(ws.wsId));
            setSelectedWs(selectedWsData);
        }
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const selectedUserId = Number(e.target.value);
        setValue('user', selectedUserId);
        const selectedUser = userList.find(user => user.userId === selectedUserId);
        if (selectedUser) {
            setSelectedRoleName(selectedUser.userRoleList[0]?.roleName || '');
        }
    };

    const editMap: SubmitHandler<MapFormInput> = async (value) => {
        setLoading(true);
        let roleListTemp = rolesListFromService.filter(option => option.roleName === selectedRoleName);

        try {
            // const watershedIdsString = value.ws_name.join(',');

            // const mapData = selectedWs.map(ws => ({
            //     userId: value.user,
            //     watershedId: value.ws_name,
            //     createdUser: fetchUserData(userId),
            //     updatedUser: fetchUserData(userId),
            //     remarks: value.remarks,
            //     roleId: roleListTemp[0].roleId
            // }));
            let mapData = {
                userId: value.user,
                watershedId: value.ws_name,
                createdUser: props.mapDetails.createdUser,
                updatedUser: fetchUserData(userId),
                remarks: value.remarks,
                roleId: roleListTemp[0].roleId
            }

            let resp = await editWS(mapData, props.mapDetails.mappingId);
            if (resp) {
                setSeverityColor("success");
                setMessage("WaterShed mapping updated successfully");
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
                <DialogTitle>{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Edit_Mapping_Label")}</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                id="user"
                                disabled
                                label={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.User_Name")}
                                {...register('user', {
                                    // required: 'User Name is required'
                                })}
                                defaultValue={props.mapDetails.userId}
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
                                label={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Role")}
                                value={selectedRoleName}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="remarks"
                                label={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Remarks")}
                                InputLabelProps={{ shrink: true }}
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
                        <Grid item xs={12}>
                            {selectedRoleName === 'Community Resource person' ? <>
                                <FormControl fullWidth required>
                                    <InputLabel id="ws_name-label">{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Ws_Name")}</InputLabel>
                                    <Select
                                        labelId="ws_name-label"
                                        id="ws_name"
                                        value={(watch('ws_name') && watch('ws_name')[0]) || ''}
                                        onChange={handleWatershedChange}
                                        input={<OutlinedInput label={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Ws_Name")} />}
                                        renderValue={(selected: number) => {
                                            const ws = wsList.find(option => option.wsId === selected);
                                            return ws ? ws.wsName : '';
                                        }}
                                        error={!!errors.ws_name}
                                    >
                                        {wsList.map((option, index) => (
                                            <MenuItem key={index} value={option.wsId}>{option.wsName}</MenuItem>
                                        ))}
                                    </Select>

                                    {errors.ws_name && <p>{errors.ws_name.message}</p>}
                                </FormControl>
                            </> : <>
                                <FormControl fullWidth required>
                                    <InputLabel id="ws_name-label">{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Ws_Name")}</InputLabel>
                                    <Select
                                        labelId="ws_name-label"
                                        id="ws_name"
                                        multiple
                                        value={watch('ws_name') || []}
                                        onChange={handleWatershedChange}
                                        input={<OutlinedInput label={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Ws_Name")} />}
                                        renderValue={(selected: number[]) => selected.map(id => {
                                            const ws = wsList.find(option => option.wsId === id);
                                            return ws ? ws.wsName : '';
                                        }).join(', ')}
                                        error={!!errors.ws_name}
                                    >
                                        {wsList.map((option, index) => (
                                            <MenuItem key={index} value={option.wsId}>
                                                <Checkbox
                                                    checked={watch('ws_name')?.indexOf(option.wsId) > -1}
                                                />
                                                {option.wsName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.ws_name && <p>{errors.ws_name.message}</p>}
                                </FormControl>
                            </>}
                        </Grid>
                        <Grid item xs={12}>
                            {selectedWs.length > 0 &&
                                <TableContainer component={Paper} sx={{ maxHeight: '300px' }}><Table>
                                    <TableHead>
                                        <TableRow sx={{ alignItems: 'center' }}>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Watershed_Name")}</TableCell>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.State")}</TableCell>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.District")}</TableCell>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Taluka")}</TableCell>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Grampanchayat")}</TableCell>
                                            <TableCell >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Village")}</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? selectedWs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : selectedWs
                                        ).map((row, id) => (
                                            <TableRow key={id}>
                                                <TableCell>
                                                    {row.wsName || ''}
                                                </TableCell>
                                                <TableCell>
                                                    {row.state.stateName || ''}
                                                </TableCell>
                                                <TableCell>
                                                    {row.district.districtName || ''}
                                                </TableCell>
                                                <TableCell>
                                                    {row.taluk.talukName || ''}
                                                </TableCell>
                                                <TableCell>
                                                    {row.gramPanchayat.panchayatName || ''}
                                                </TableCell>
                                                <TableCell>
                                                    {row.village.villageName || ''}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    {/* <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={selectedWs.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={(e, p) => setPage(p)}
                                                rowsPerPageOptions={[5, 10, 15]}
                                                onRowsPerPageChange={(e) => { setPage(0); setRowsPerPage(parseInt(e.target.value)); }}
                                                ActionsComponent={TPA}
                                            />
                                        </TableRow>
                                    </TableFooter> */}
                                </Table></TableContainer>}
                        </Grid>
                        {/* {selectedWs.map(ws => (
                            <>
                                <Grid item xs={12}>
                                    <Divider textAlign="left">{ws.wsName}</Divider>
                                </Grid>
                                <React.Fragment key={ws.wsId}>
                                    <Grid item xs={4}><TextField label='Description' disabled value={ws.wsDescription || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                    <Grid item xs={4}><TextField label='State' disabled value={ws.state.stateName || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                    <Grid item xs={4}><TextField label='District' disabled value={ws.district.districtName || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                    <Grid item xs={4}><TextField label='Taluka' disabled value={ws.taluk.talukName || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                    <Grid item xs={4}><TextField label="Grampanchayat" disabled value={ws.gramPanchayat.panchayatName || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                    <Grid item xs={4}><TextField label="Village" disabled value={ws.village.villageName || ''} InputLabelProps={{ shrink: true }} /></Grid>
                                </React.Fragment>
                                <Grid item xs={12}><Divider /></Grid>
                            </>))} */}

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Cancel_Button")}</Button>
                    <Button disabled={loading || !isValid || selectedWs.length === 0 || !formValues.user} onClick={handleSubmit(editMap)}>{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Mapping_Popup.Update_Button")}{loading ? <CircularProgress /> : null}</Button>
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