import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    MenuItem
} from "@mui/material";
import { AddHome, Edit } from '@mui/icons-material';
import { sd, TPA, PerChk } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';
import { listState, listDistrict, talukById, VillageById, panchayatById } from '../../Services/locationService';
import { VillageName } from '../../LocName';

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
    const tHeads: string[] = ['Watershed', 'Description', 'Villages', 'Actions'];
    const [wsList, setwsList] = React.useState<typeof defObj[]>([]);
    const [wsObj, setwsObj] = React.useState(defObj);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    //options lists
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);

    React.useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const resp1 = await listWS(); if (resp1) {
                setwsList(resp1)
            }
            const resp2 = await listState(); if (resp2) {
                setstOps(resp2)
            }
            const resp3 = await listDistrict(); if (resp3) {
                setdsOps(resp3)
            }
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
        try {
            const resp = await talukById(e.target.value);
            if (resp) { settlOps(resp) }
        }
        catch (error) { console.log(error) }
    }

    const talukCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            talukId: e.target.value,
            grampanchayatId: "",
            villageId: ""
        })
    }

    const panchayatCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            grampanchayatId: e.target.value,
            villageId: ""
        })
    }

    const WSadd = async () => {
        try {
            const resp = await addWS(wsObj)
            if (resp) { console.log('Add success') }
        }
        catch (error) { console.log(error) }
        setaddM(false);
    }

    const WSedit = async (id: any) => {
        try {
            const resp = await editWS(wsObj, id)
            if (resp) { console.log('Add success') }
        }
        catch (error) { console.log(error) }
        seteditM(false);
    }

    return (<>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} />
            {PerChk('EDIT_Watershed Master') && (
                <Button startIcon={<AddHome />} onClick={() => { setwsObj(defObj); setaddM(true); }}>Add WS</Button>)}
        </Box>

        <TableContainer component={Paper} sx={{ height: '90%' }}><Table>
            <TableHead>
                <TableRow>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>{wsList.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.wsName}</TableCell>
                    <TableCell>{w.wsDescription}</TableCell>
                    <TableCell>{VillageName(w.villageId)}</TableCell>
                    {PerChk('EDIT_Watershed Master') && (
                        <TableCell><IconButton><Edit onClick={() => { setwsObj(w); seteditM(true); }} /></IconButton></TableCell>)}
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={wsList.length}
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
                <Grid item xs={4}><TextField select label='State' disabled value={wsObj.stateId}>{stOps.map((o, i) =>
                    (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>)
                )}</TextField></Grid>
                <Grid item xs={4}><TextField select label='District' value={wsObj.districtId} onChange={(e) => districtCh(e)}>{dsOps.map((o, i) =>
                    (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>)
                )}</TextField></Grid>
                <Grid item xs={4}><TextField select label='Taluk' value={wsObj.talukId} onChange={(e) => talukCh(e)}>

                </TextField></Grid>
                <Grid item xs={4}><TextField select label="Grampanchayat" value={wsObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField select label="Village" value={wsObj.villageId} onChange={(e) => setwsObj({ ...wsObj, villageId: e.target.value })} /></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Close</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit {wsObj.wsName}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={wsObj.wsName} onChange={(e) => setwsObj({ ...wsObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={wsObj.wsDescription} onChange={(e) => setwsObj({ ...wsObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={wsObj.stateId} /></Grid>
                <Grid item xs={4}><TextField label='District' value={wsObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={wsObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={wsObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Villages" value={wsObj.villageId} onChange={(e) => setwsObj({ ...wsObj, villageId: e.target.value })} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => seteditM(false)}>Close</Button>
                <Button onClick={() => WSedit(wsObj.wsId)}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}