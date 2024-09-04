import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    Paper, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Fab
} from "@mui/material";
import { Add } from '@mui/icons-material';
import { sd } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';

const wsObj = {
    ws_name: "",
    ws_description: "",
    name_of_the_state: "Karnataka",
    name_of_the_district: "",
    name_of_the_taluka: "",
    name_of_the_grampanchayat: "",
    name_of_the_village: "",
    map_link: "",
    users: ""
}

export const WsMaster: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['Watershed', 'Description', 'Location', 'Villages'];
    const wsList: typeof wsObj[] = [
        {
            ws_name: "WS1",
            ws_description: "D1",
            name_of_the_state: "Karnataka",
            name_of_the_district: "",
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: "V1",
            map_link: "",
            users: ""
        },
        {
            ws_name: "WS2",
            ws_description: "D2",
            name_of_the_state: "Karnataka",
            name_of_the_district: "",
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: "V@",
            map_link: "",
            users: ""
        }

    ]
    const [addObj, setaddObj] = React.useState(wsObj);
    const [addM, setaddM] = React.useState(false);
    const [selected, setselected] = React.useState(false);

    /* React.useEffect(() => {
        const fetchData = async () => {
            const resp = await listWS();
            if (resp) {
                console.log('Success')
            }
        }; fetchData();
    }, []) */

    const stateCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            name_of_the_state: e.target.value,
            name_of_the_district: "",
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const districtCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            name_of_the_district: e.target.value,
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const talukCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            name_of_the_taluka: e.target.value,
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const panchayatCh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setaddObj({
            ...addObj,
            name_of_the_grampanchayat: e.target.value,
            name_of_the_village: ""
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

    return (<Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}><TableContainer><Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>{wsList.map((w, i) => (
                <TableRow key={i} onClick={() => setselected(true)}>
                    <TableCell>{w.ws_name}</TableCell>
                    <TableCell>{w.ws_description}</TableCell>
                    <TableCell>{w.name_of_the_state}</TableCell>
                    <TableCell>{w.name_of_the_village}</TableCell>
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={({ count, page }) => `Page ${page + 1} of ${Math.ceil(count / rPP)}`}
                />
            </TableRow></TableFooter>
        </Table></TableContainer></Paper>

        <Dialog open={selected} onClose={() => setselected(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.ws_name} onChange={(e) => setaddObj({ ...addObj, ws_name: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={addObj.ws_description} onChange={(e) => setaddObj({ ...addObj, ws_description: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label="Users" value={addObj.users} onChange={(e) => setaddObj({ ...addObj, users: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.name_of_the_state} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.name_of_the_district} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.name_of_the_taluka} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.name_of_the_grampanchayat} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Villages" value={addObj.name_of_the_village} onChange={(e) => setaddObj({ ...addObj, name_of_the_village: e.target.value })} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setselected(false)}>Close</Button>
                <Button>Add</Button>
            </DialogActions>
        </Dialog>

        <Fab onClick={listWS}><Add /></Fab>

        <Dialog open={addM} onClose={() => setaddM(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.ws_name} onChange={(e) => setaddObj({ ...addObj, ws_name: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={addObj.ws_description} onChange={(e) => setaddObj({ ...addObj, ws_description: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.name_of_the_state} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.name_of_the_district} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.name_of_the_taluka} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.name_of_the_grampanchayat} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Village" value={addObj.name_of_the_village} onChange={(e) => setaddObj({ ...addObj, name_of_the_village: e.target.value })} /></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Close</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}