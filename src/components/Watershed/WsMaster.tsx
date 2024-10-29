import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter, FormControl,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Select,
    MenuItem, InputAdornment, Typography, CircularProgress, Checkbox, ListItemText, OutlinedInput, InputLabel,
} from "@mui/material";
import { AddHome, Edit, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listWS, addWS, editWS, deleteWS } from '../../Services/wsService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { SelectChangeEvent } from '@mui/material/Select';

export const wsDef = {
    watershedId: '',
    wsName: '',
    wsDescription: '',
    stateId: '1',
    stateName: '',
    districtId: '',
    districtName: '',
    talukId: '',
    talukName: '',
    gramPanchayatId: '',
    gramPanchayatName: '',
    villages: ['']
}

export const WsMaster: React.FC = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [wsList, setwsList] = React.useState<typeof wsDef[]>([]);
    const [wsObj, setwsObj] = React.useState(wsDef);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [deleteM, setdeleteM] = React.useState("");
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState("");
    const [alertClr, setalertClr] = React.useState(false);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [isTouched, setIsTouched] = React.useState({ wsName: false, wsDescription: false });
    const [vList, setvList] = React.useState<any[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof vList>) => {
        const {
            target: { value },
        } = event;
        setvList(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFieldChange = (field: string, value: string) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        setwsObj((prev) => ({ ...prev, [field]: value }));
    };

    const addCheck = !wsObj.wsName || !wsObj.wsDescription

    const wsListF = wsList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsName?.toLowerCase().includes(searchTerm) ||
            w.wsDescription?.toLowerCase().includes(searchTerm)
        );
    });

    const wsListP = wsListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.districtId) {
                    const resp = await talukById(wsObj.districtId);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.districtId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.talukId) {
                    const resp = await panchayatById(wsObj.talukId);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.talukId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.gramPanchayatId) {
                    const resp = await VillageById(wsObj.gramPanchayatId);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.gramPanchayatId])

    const fetchData = async () => {
        try {
            const resp1 = await listWS(); if (resp1.status === 'success') {
                setwsList(resp1.data.reverse());
            }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
        setLoadingResponse(false);
    };

    const districtCh = async (e: any) => {
        setwsObj({
            ...wsObj,
            districtId: e,
            talukId: '',
            gramPanchayatId: '',
            villages: []
        })
    }

    const talukCh = (e: any) => {
        setwsObj({
            ...wsObj,
            talukId: e,
            gramPanchayatId: '',
            villages: []
        })
    }

    const panchayatCh = (e: any) => {
        setwsObj({
            ...wsObj,
            gramPanchayatId: e,
            villages: []
        })
    }

    const WSadd = async () => {
        setLoading(true);
        const addObj = {
            "wsName": wsObj.wsName,
            "wsDescription": wsObj.wsDescription,
            "stateId": wsObj.stateId,
            "districtId": wsObj.districtId,
            "talukId": wsObj.talukId,
            "grampanchayatId": wsObj.gramPanchayatId,
            "villageId": vList,
            "mapLink": "https://example.com/map-link"
        }
        try {
            const resp = await addWS(addObj)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert("Watershed added");
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to add watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add watershed");
        }
        setLoading(false);
        setaddM(false);
    }

    const WSedit = async (id: any) => {
        setLoading(true);
        const editObj = {
            "wsName": wsObj.wsName,
            "wsDescription": wsObj.wsDescription,
            "stateId": wsObj.stateId,
            "districtId": wsObj.districtId,
            "talukId": wsObj.talukId,
            "grampanchayatId": wsObj.gramPanchayatId,
            "villageId": vList,
            "mapLink": "https://example.com/map-link"
        }
        try {
            const resp = await editWS(editObj, id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Watershed updated`);
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to update watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update watershed");
        }
        setLoading(false);
        seteditM(false);
    }

    const WSdelete = async (id: any) => {
        setLoading(true);
        try {
            const resp = await deleteWS(id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Watershed deleted`);
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to delete watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to delete watershed");
        }
        setLoading(false);
        setdeleteM('');
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />
        {loadingResponse ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={80} />
            </Box> : <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top', height: '10%' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Watershed Master</Typography>
                    <div>
                        <TextField label="Search" fullWidth={false} value={search} onChange={(e) => { setsearch(e.target.value); setPage(0); }}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                        {PerChk('EDIT_Watershed Master') && (<Button startIcon={<AddHome />}
                            onClick={() => { setwsObj(wsDef); setvList([]); setaddM(true); setIsTouched({ wsName: false, wsDescription: false }) }}
                            sx={{ height: '48px', ml: '4px' }}>Add Watershed</Button>)}
                    </div>
                </Box>

                {wsList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                    : wsListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                        : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Watershed</TableCell>
                                    <TableCell>Description</TableCell>
                                    {PerChk('EDIT_Watershed Master') && <TableCell width='5%'>Actions</TableCell>}
                                </TableRow>
                            </TableHead>

                            <TableBody>{wsListP.map((w, i) => (
                                <TableRow key={i}>
                                    <TableCell>{w.wsName}</TableCell>
                                    <TableCell>{w.wsDescription}</TableCell>
                                    {PerChk('EDIT_Watershed Master') && <TableCell>
                                        <IconButton title='Edit watershed' onClick={() => { setwsObj(w); setvList(w.villages.map(village => parseInt(village, 10))); seteditM(true); }}><Edit /></IconButton>
                                        <IconButton title='Delete watershed' onClick={() => { setdeleteM(w.watershedId); }}><Delete /></IconButton>
                                    </TableCell>}
                                </TableRow>
                            ))}</TableBody>

                            <TableFooter><TableRow>
                                <TablePagination
                                    count={wsListF.length}
                                    rowsPerPage={rPP}
                                    page={page}
                                    onPageChange={(e, p) => setPage(p)}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                                    ActionsComponent={TPA}
                                />
                            </TableRow></TableFooter>
                        </Table></TableContainer>}
            </>}

        <Dialog open={addM || editM}>
            <DialogTitle>{addM ? 'Add Watershed' : editM ? 'Edit Watershed' : ''}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Name"
                        value={wsObj.wsName}
                        onChange={(e) => handleFieldChange('wsName', e.target.value)}
                        helperText={isTouched.wsName && !wsObj.wsName ? 'Watershed name cannot be empty' : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Description"
                        value={wsObj.wsDescription}
                        onChange={(e) => handleFieldChange('wsDescription', e.target.value)}
                        helperText={isTouched.wsDescription && !wsObj.wsDescription ? 'Watershed description cannot be empty' : ''}
                    />
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField disabled required select label='State' value={wsObj.stateId}>
                    {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label='District' value={wsObj.districtId} onChange={(e) => districtCh(e.target.value)}>
                    {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label='Taluk' value={wsObj.talukId} onChange={(e) => talukCh(e.target.value)}>
                    {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label="Grampanchayat" value={wsObj.gramPanchayatId} onChange={(e) => panchayatCh(e.target.value)}>
                    {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Villages</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={vList}
                        onChange={handleChange}
                        input={<OutlinedInput label="Villages" />}
                        renderValue={(selected) =>
                            selected
                                .map((id) => vilOps.find((o) => o.villageId === id)?.villageName)
                                .filter(Boolean) // Filter undefined
                                .join(', ')
                        }
                        sx={{ height: '48px' }}
                    >
                        {vilOps?.map((o) => (
                            <MenuItem key={o.villageId} value={o.villageId}>
                                <Checkbox checked={vList.includes(o.villageId)} />
                                <ListItemText primary={o.villageName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl></Grid>
                <Grid item xs={12}><Typography><b>Selected villages:</b> {vList
                    .map((id) => vilOps.find((o) => o.villageId === id)?.villageName)
                    .filter(Boolean)
                    .join(', ')}</Typography></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>Cancel</Button>
                {addM ? <Button startIcon={loading ? <CircularProgress /> : null} onClick={WSadd} disabled={addCheck || loading}>Add</Button>
                    : editM ? <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => WSedit(wsObj.watershedId)} disabled={addCheck || loading}>Update</Button>
                        : null}
            </DialogActions>
        </Dialog>

        <Dialog open={Boolean(deleteM)} maxWidth='xs'>
            <DialogTitle>Delete Watershed</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>Are you sure you want to delete this watershed?</DialogContent>
            <DialogActions>
                <Button onClick={() => setdeleteM('')} disabled={loading}>Cancel</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => WSdelete(deleteM)} disabled={loading}>Delete</Button>
            </DialogActions>
        </Dialog>
    </>)
}