import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter, Typography,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider
} from "@mui/material";
import { Add } from '@mui/icons-material';
import { sd, TPA } from '../../common';
import { listWS, addWS, editWS } from '../../Services/wsService';

const wsObj = {
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
    const rPP = 10;
    const tHeads: string[] = ['Watershed', 'Description', 'Location', 'Villages'];
    const [addObj, setaddObj] = React.useState(wsObj);
    const [editObj, seteditObj] = React.useState<null | typeof wsObj>(null);
    const [addM, setaddM] = React.useState(false);

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
                stateId: '1',
                districtId: '2',
                talukId: '3',
                grampanchayatId: '4',
                villageId: '5',
                mapLink: '6'
            }
            const resp = await addWS(defObj)
            if (resp) { console.log('Add success') }
        }
        catch (error) { console.log(error) }
    }

    return (<Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}>
            <Button onClick={() => setaddM(true)} startIcon={<Add />}>Add WS</Button>
        </Box>

        <Table>
            <TableHead>
                <TableRow>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => seteditObj(wsObj)}>
                    <TableCell>Ganga</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>State, District, Taluk, Panchayat</TableCell>
                    <TableCell>Villages</TableCell>
                </TableRow>
            </TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={() => ""}
                    ActionsComponent={TPA}
                />
            </TableRow></TableFooter>
        </Table>

        <Dialog open={addM} onClose={() => setaddM(false)}>
            <DialogTitle>Add New Watershed</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><Divider><Typography>Watershed Details</Typography></Divider></Grid>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.wsName} onChange={(e) => setaddObj({ ...addObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField multiline rows={4} label='Description' value={addObj.wsDescription} onChange={(e) => setaddObj({ ...addObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Divider><Typography>Location Details</Typography></Divider></Grid>
                <Grid item xs={12}><TextField label="Map Link" value={addObj.mapLink} onChange={(e) => setaddObj({ ...addObj, mapLink: e.target.value })} /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Villages" value={addObj.villageId} onChange={(e) => setaddObj({ ...addObj, villageId: e.target.value })} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Cancel</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={Boolean(editObj)} onClose={() => seteditObj(null)}>
            <DialogTitle>Add New Watershed</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><Divider><Typography>Watershed Details</Typography></Divider></Grid>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.wsName} onChange={(e) => setaddObj({ ...addObj, wsName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField multiline rows={4} label='Description' value={addObj.wsDescription} onChange={(e) => setaddObj({ ...addObj, wsDescription: e.target.value })} /></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Divider><Typography>Location Details</Typography></Divider></Grid>
                <Grid item xs={12}><TextField label="Map Link" value={addObj.mapLink} onChange={(e) => setaddObj({ ...addObj, mapLink: e.target.value })} /></Grid>
                <Grid item xs={4}><TextField label='State' disabled value={addObj.stateId} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.districtId} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.talukId} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.grampanchayatId} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Villages" value={addObj.villageId} onChange={(e) => setaddObj({ ...addObj, villageId: e.target.value })} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => seteditObj(null)}>Cancel</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}