import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    MenuItem, InputAdornment
} from "@mui/material";
import { AddHome, Edit, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { StateName, DistrictName, TalukName, PanName, VillageName } from '../../LocName';

const defObj = {
    wsId: "",
    wsName: "",
    wsDescription: "",
    stateId: "1",
    districtId: "",
    talukId: "",
    grampanchayatId: "",
    villageId: "",
    mapLink: ""
}

export const WsMaster: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [wsList, setwsList] = React.useState<typeof defObj[]>([]);
    const [wsObj, setwsObj] = React.useState(defObj);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState<string | null>(null);
    const [alertClr, setalertClr] = React.useState(false);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);

    const addCheck = !wsObj.wsName || !wsObj.wsDescription || !wsObj.villageId

    const wsListF = wsList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsName?.toLowerCase().includes(searchTerm) ||
            w.wsDescription?.toLowerCase().includes(searchTerm) ||
            VillageName(w.villageId)?.toLowerCase().includes(searchTerm)
        );
    });

    const wsListP = wsListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.districtId) {
                    const resp = await talukById(wsObj.districtId);
                    if (resp) { settlOps(resp); }
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
                    if (resp) { setpanOps(resp); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.talukId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.grampanchayatId) {
                    const resp = await VillageById(wsObj.grampanchayatId);
                    if (resp) { setvilOps(resp); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.grampanchayatId])

    const fetchData = async () => {
        try {
            const resp1 = await listWS(); if (resp1) { setwsList(resp1) }
            setstOps(JSON.parse(sessionStorage.getItem("StateList") as string));
            setdsOps(JSON.parse(sessionStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
    };

    const districtCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            districtId: e.target.value,
            talukId: "",
            grampanchayatId: "",
            villageId: ""
        })
    }

    const talukCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            talukId: e.target.value,
            grampanchayatId: "",
            villageId: ""
        })
    }

    const panchayatCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            grampanchayatId: e.target.value,
            villageId: ""
        })
    }

    const WSadd = async () => {
        try {
            const resp = await addWS(wsObj)
            if (resp) {
                fetchData(); setalertClr(true);
                setalert("Watershed added");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add watershed");
        }
        setaddM(false);
    }

    const WSedit = async (id: any) => {
        try {
            const resp = await editWS(wsObj, id)
            if (resp) {
                fetchData(); setalertClr(true);
                setalert(`Watershed ${wsObj.wsName || ""} updated`);
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add watershed");
        }
        seteditM(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert(null)} success={alertClr} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
            {PerChk('EDIT_Watershed Master') && (<Button startIcon={<AddHome />} title='Add a new watershed'
                onClick={() => { setwsObj(defObj); setaddM(true); }}>Add WS</Button>)}
        </Box>

        <TableContainer component={Paper}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Villages</TableCell>
                    {PerChk('EDIT_Watershed Master') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{wsListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.wsName}</TableCell>
                    <TableCell>{w.wsDescription}</TableCell>
                    <TableCell>{VillageName(w.villageId)}</TableCell>
                    {PerChk('EDIT_Watershed Master') && <TableCell><IconButton
                        title='Edit watershed' onClick={() => { setwsObj(w); seteditM(true); }}>
                        <Edit /></IconButton></TableCell>}
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
        </Table></TableContainer>

        <Dialog open={addM}>
            <DialogTitle>Add New Watershed</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Name' value={wsObj.wsName} onChange={(e) => setwsObj({ ...wsObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={wsObj.wsDescription} onChange={(e) => setwsObj({ ...wsObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField select label='State' disabled value={wsObj.stateId}>
                    {stOps.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label='District' value={wsObj.districtId} onChange={(e) => districtCh(e)}>
                    {dsOps.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label='Taluk' value={wsObj.talukId} onChange={(e) => talukCh(e)}>
                    {tlOps.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label="Grampanchayat" value={wsObj.grampanchayatId} onChange={(e) => panchayatCh(e)}>
                    {panOps.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label="Village" value={wsObj.villageId} onChange={(e) => setwsObj({ ...wsObj, villageId: e.target.value })}>
                    {vilOps.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }}>Close</Button>
                <Button onClick={WSadd} disabled={addCheck}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit {wsObj.wsName}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Name' value={wsObj.wsName} onChange={(e) => setwsObj({ ...wsObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={wsObj.wsDescription} onChange={(e) => setwsObj({ ...wsObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField select label='State' disabled value={wsObj.stateId}>
                    {stOps.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label='District' value={wsObj.districtId} onChange={(e) => districtCh(e)}>
                    {dsOps.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label='Taluk' value={wsObj.talukId} onChange={(e) => talukCh(e)}>
                    {tlOps.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label="Grampanchayat" value={wsObj.grampanchayatId} onChange={(e) => panchayatCh(e)}>
                    {panOps.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4}><TextField select label="Village" value={wsObj.villageId} onChange={(e) => setwsObj({ ...wsObj, villageId: e.target.value })}>
                    {vilOps.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { seteditM(false); }}>Close</Button>
                <Button onClick={() => WSedit(wsObj.wsId)} disabled={addCheck}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}