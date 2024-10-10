import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    MenuItem, InputAdornment, Typography, CircularProgress
} from "@mui/material";
import { AddHome, Edit, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listWS, addWS, editWS, deleteWS } from '../../Services/wsService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { VillageName } from '../../LocName';

export const wsDef = {
    wsId: "",
    wsName: "",
    wsDescription: "",
    state: {
        stateId: "1",
        stateName: "",
        createdUser: "",
        updatedUser: "",
        createdTime: "",
        updatedTime: ""
    },
    district: {
        districtId: "",
        districtName: "",
        stateId: "",
        createdUser: "",
        updatedUser: "",
        createdTime: "",
        updatedTime: ""
    },
    taluk: {
        talukId: "",
        talukName: "",
        districtId: "",
        createdUser: "",
        updatedUser: "",
        createdTime: "",
        updatedTime: ""
    },
    gramPanchayat: {
        panchayatId: "",
        panchayatName: "",
        talukId: "",
        createdUser: "",
        updatedUser: "",
        createdTime: "",
        updatedTime: ""
    },
    village: {
        villageId: "",
        villageName: "",
        grampanchayatId: "",
        createdUser: "",
        updatedUser: "",
        createdTime: "",
        updatedTime: ""
    },
    mapLink: ""
}

export const WsMaster: React.FC = () => {
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

    const handleFieldChange = (field: string, value: string) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        setwsObj((prev) => ({ ...prev, [field]: value }));
    };

    const addCheck = !wsObj.wsName || !wsObj.wsDescription || !wsObj.village.villageId

    const wsListF = wsList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsName?.toLowerCase().includes(searchTerm) ||
            w.wsDescription?.toLowerCase().includes(searchTerm) ||
            VillageName(w.village.villageId)?.toString().toLowerCase().includes(searchTerm)
        );
    });

    const wsListP = wsListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.district.districtId) {
                    const resp = await talukById(wsObj.district.districtId);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.district.districtId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.taluk.talukId) {
                    const resp = await panchayatById(wsObj.taluk.talukId);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.taluk.talukId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.gramPanchayat.panchayatId) {
                    const resp = await VillageById(wsObj.gramPanchayat.panchayatId);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.gramPanchayat.panchayatId])

    const fetchData = async () => {
        try {
            const resp1 = await listWS(); if (resp1.status === 'success') { setwsList(resp1.data.reverse()) }
            setstOps(JSON.parse(sessionStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(sessionStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
    };

    const districtCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            district: { ...wsObj.district, districtId: e.target.value },
            taluk: { ...wsObj.taluk, talukId: '' },
            gramPanchayat: { ...wsObj.gramPanchayat, panchayatId: '' },
            village: { ...wsObj.village, villageId: '' }
        })
    }

    const talukCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            taluk: { ...wsObj.taluk, talukId: e.target.value },
            gramPanchayat: { ...wsObj.gramPanchayat, panchayatId: '' },
            village: { ...wsObj.village, villageId: '' }
        })
    }

    const panchayatCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            gramPanchayat: { ...wsObj.gramPanchayat, panchayatId: e.target.value },
            village: { ...wsObj.village, villageId: '' }
        })
    }

    const villageCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            village: { ...wsObj.village, villageId: e.target.value }
        })
    }

    const WSadd = async () => {
        setLoading(true);
        try {
            let AEObj = {
                wsName: wsObj.wsName,
                wsDescription: wsObj.wsDescription,
                stateId: wsObj.state.stateId,
                districtId: wsObj.district.districtId,
                talukId: wsObj.taluk.talukId,
                grampanchayatId: wsObj.gramPanchayat.panchayatId,
                villageId: wsObj.village.villageId
            }
            const resp = await addWS(AEObj)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert("Watershed added");
            }
            else {
                setalertClr(false);
                setalert("Failed to add watershed");
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
        try {
            let AEObj = {
                wsName: wsObj.wsName,
                wsDescription: wsObj.wsDescription,
                stateId: wsObj.state.stateId,
                districtId: wsObj.district.districtId,
                talukId: wsObj.taluk.talukId,
                grampanchayatId: wsObj.gramPanchayat.panchayatId,
                villageId: wsObj.village.villageId
            }
            const resp = await editWS(AEObj, id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Watershed updated`);
            }
            else {
                setalertClr(false);
                setalert("Failed to update watershed");
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
                setalert("Failed to delete watershed");
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Watershed Master</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Watershed Master') && (<Button startIcon={<AddHome />}
                    onClick={() => { setwsObj(wsDef); setaddM(true); setIsTouched({ wsName: false, wsDescription: false }) }}
                    sx={{ height: '100%', ml: '4px' }}>Add Watershed</Button>)}
            </div>
        </Box>

        {wsList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Village</TableCell>
                    {PerChk('EDIT_Watershed Master') && <TableCell width='5%'>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{wsListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.wsName}</TableCell>
                    <TableCell>{w.wsDescription}</TableCell>
                    <TableCell>{VillageName(w.village.villageId)}</TableCell>
                    {PerChk('EDIT_Watershed Master') && <TableCell>
                        <IconButton title='Edit watershed' onClick={() => { setwsObj(w); seteditM(true); }}><Edit /></IconButton>
                        <IconButton title='Delete watershed' onClick={() => { setdeleteM(w.wsId); }}><Delete /></IconButton>
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

        <Dialog open={addM}>
            <DialogTitle>Add New Watershed</DialogTitle>

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
                <Grid item xs={4}><TextField disabled required select label='State' value={wsObj.state.stateId}>
                    {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField disabled={dsOps?.length <= 0} required select label='District' value={wsObj.district.districtId} onChange={(e) => districtCh(e)}>
                    {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField disabled={tlOps?.length <= 0} required select label='Taluk' value={wsObj.taluk.talukId} onChange={(e) => talukCh(e)}>
                    {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField disabled={panOps?.length <= 0} required select label="Grampanchayat" value={wsObj.gramPanchayat.panchayatId} onChange={(e) => panchayatCh(e)}>
                    {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField disabled={vilOps?.length <= 0} required select label="Village" value={wsObj.village.villageId} onChange={(e) => villageCh(e)}>
                    {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                </TextField></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }} disabled={loading}>Cancel</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} onClick={WSadd} disabled={addCheck || loading}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit Watershed</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField required label='Name' value={wsObj.wsName}
                    onChange={(e) => setwsObj({ ...wsObj, wsName: e.target.value })}
                    helperText={!wsObj.wsName ? 'Watershed name cannot be empty' : ''}
                /></Grid>
                <Grid item xs={12}><TextField required label='Description'
                    value={wsObj.wsDescription} onChange={(e) => setwsObj({ ...wsObj, wsDescription: e.target.value })}
                    helperText={!wsObj.wsDescription ? 'Watershed description cannot be empty' : ''}
                /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField select label='State' disabled value={wsObj.state.stateId}>
                    {stOps.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label='District' value={wsObj.district.districtId} onChange={(e) => districtCh(e)}>
                    {dsOps.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label='Taluk' value={wsObj.taluk.talukId} onChange={(e) => talukCh(e)}>
                    {tlOps.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label="Grampanchayat" value={wsObj.gramPanchayat.panchayatId} onChange={(e) => panchayatCh(e)}>
                    {panOps.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField required select label="Village" value={wsObj.village.villageId} onChange={(e) => villageCh(e)}>
                    {vilOps.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                </TextField></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { seteditM(false); }} disabled={loading}>Cancel</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => WSedit(wsObj.wsId)} disabled={addCheck || loading}>Update</Button>
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