import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider
} from "@mui/material";
import { AddHome, Edit } from '@mui/icons-material';
import { sd, TPA } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';

const defObj = {
    wsId: "",
    wsName: "",
    wsDescription: "",
    stateId: "",
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
    const [stOps, setstOps] = React.useState([]);
    const [dsOps, setdsOps] = React.useState([]);
    const [tlOps, settlOps] = React.useState([]);
    const [panOps, setpanOps] = React.useState([]);
    const [vilOps, setvilOps] = React.useState([]);

    React.useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const resp1 = await listWS(); if (resp1) {
                setwsList(resp1)
            }
        }
        catch (error) { console.log(error) }
    };

    const stateCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            stateId: e.target.value,
            districtId: "",
            talukId: "",
            grampanchayatId: "",
            villageId: ""
        })
    }

    const districtCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setwsObj({
            ...wsObj,
            districtId: e.target.value,
            talukId: "",
            grampanchayatId: "",
            villageId: ""
        })
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
            <Button startIcon={<AddHome />} onClick={() => { setwsObj(defObj); setaddM(true); }}>Add WS</Button>
        </Box>

        <TableContainer sx={{ height: '80%', overflow: 'auto' }}><Table>
            <TableHead>
                <TableRow>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>{wsList.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.wsName}</TableCell>
                    <TableCell>{w.wsDescription}</TableCell>
                    <TableCell>{w.villageId}</TableCell>
                    <TableCell><IconButton><Edit onClick={() => { setwsObj(w); seteditM(true); }} /></IconButton></TableCell>
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
                <Grid item xs={12}><TextField label='Watershed' value={wsObj.wsName} onChange={(e) => setwsObj({ ...wsObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={wsObj.wsDescription} onChange={(e) => setwsObj({ ...wsObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={wsObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={wsObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={wsObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={wsObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Village" value={wsObj.villageId} onChange={(e) => setwsObj({ ...wsObj, villageId: e.target.value })} /></Grid>
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
                <Grid item xs={4}><TextField label='State' disabled value={wsObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
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