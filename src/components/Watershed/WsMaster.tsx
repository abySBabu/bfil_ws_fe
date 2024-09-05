import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    Paper, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider,
    IconButton
} from "@mui/material";
import { AddHome, Edit } from '@mui/icons-material';
import { sd, TPA } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';

const defObj = {
    wsName: "",
    wsDescription: "",
    stateId: "Karnataka",
    districtId: "",
    talukId: "",
    grampanchayatId: "",
    villageId: "",
    mapLink: ""
}

export const WsMaster: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['Watershed', 'Description', 'Location', 'Villages', 'Actions'];
    const wsList: typeof defObj[] = [
        {
            wsName: "WS1",
            wsDescription: "D1",
            stateId: "Karnataka",
            districtId: "",
            talukId: "",
            grampanchayatId: "",
            villageId: "V1",
            mapLink: ""
        },
        {
            wsName: "WS2",
            wsDescription: "D2",
            stateId: "Karnataka",
            districtId: "",
            talukId: "",
            grampanchayatId: "",
            villageId: "V@",
            mapLink: ""
        }

    ]
    const [addObj, setaddObj] = React.useState(defObj);
    const [addM, setaddM] = React.useState(false);
    const [selected, setselected] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await listWS(); if (resp) {
                    console.log('Success')
                }
            }
            catch (error) { console.log(error) }
        }; fetchData();
    }, [])

    const stateCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            stateId: e.target.value,
            districtId: "",
            talukId: "",
            grampanchayatId: "",
            villageId: ""
        })
    }

    const districtCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            districtId: e.target.value,
            talukId: "",
            grampanchayatId: "",
            villageId: ""
        })
    }

    const talukCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            talukId: e.target.value,
            grampanchayatId: "",
            villageId: ""
        })
    }

    const panchayatCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            grampanchayatId: e.target.value,
            villageId: ""
        })
    }

    const WSadd = async () => {
        try {
            const defObj = {
                wsName: "Watershed Name",
                wsDescription: "fhdfdfhd",
                stateId: 1,
                districtId: 2,
                talukId: 3,
                grampanchayatId: 4,
                villageId: 5,
                mapLink: 6
            }
            const resp = await addWS(defObj)
            if (resp) { console.log('Add success') }
        }
        catch (error) { console.log(error) }
    }

    return (<>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} />
            <Button startIcon={<AddHome />}>Add WS</Button>
        </Box>

        <Paper sx={{ width: '100%', mb: 2 }}><TableContainer><Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>{wsList.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.wsName}</TableCell>
                    <TableCell>{w.wsDescription}</TableCell>
                    <TableCell>{w.stateId}</TableCell>
                    <TableCell>{w.villageId}</TableCell>
                    <TableCell><IconButton><Edit onClick={() => setselected(true)} /></IconButton></TableCell>
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    ActionsComponent={TPA}
                />
            </TableRow></TableFooter>
        </Table></TableContainer></Paper>

        <Dialog open={selected} onClose={() => setselected(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.wsName} onChange={(e) => setaddObj({ ...addObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={addObj.wsDescription} onChange={(e) => setaddObj({ ...addObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Villages" value={addObj.villageId} onChange={(e) => setaddObj({ ...addObj, villageId: e.target.value })} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setselected(false)}>Close</Button>
                <Button>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={addM} onClose={() => setaddM(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.wsName} onChange={(e) => setaddObj({ ...addObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={addObj.wsDescription} onChange={(e) => setaddObj({ ...addObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Village" value={addObj.villageId} onChange={(e) => setaddObj({ ...addObj, villageId: e.target.value })} /></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Close</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}