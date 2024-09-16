import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    MenuItem, Snackbar, InputAdornment
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk } from '../../common';

const defObj = {
    year: "",
    activity: "",
    intervention: "",
    landType: "",
    stateId: "1",
    districtId: "",
    talukId: "",
    grampanchayatId: "",
    wsId: "",
    phyValue: "",
    phyUnit: "",
    finTotal: 0,
    finBfil: 0,
    finOther: 0,
    finGov: 0,
    finMgn: 0,
    finIbl: 0,
    finCom: 0
}

export const Workplan: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [planList, setplanList] = React.useState<typeof defObj[]>([]);
    const [planObj, setplanObj] = React.useState(defObj);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState<string | null>(null);

    const planListF = planList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.year?.toLowerCase().includes(searchTerm) ||
            w.activity?.toLowerCase().includes(searchTerm) ||
            w.intervention?.toLowerCase().includes(searchTerm)
        );
    });

    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => {
        setplanObj({
            ...planObj,
            finTotal: [planObj.finBfil, planObj.finOther, planObj.finGov, planObj.finMgn, planObj.finIbl, planObj.finCom].reduce((acc, val) => acc + Number(val), 0)
        });
    }, [planObj.finBfil, planObj.finOther, planObj.finGov, planObj.finMgn, planObj.finIbl, planObj.finCom]);


    return (<>
        <Snackbar open={Boolean(alert)} onClose={() => setalert(null)} autoHideDuration={3000} message={alert} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
            {PerChk('EDIT_Work Plan') && <Button startIcon={<PersonAddAlt1 />} onClick={() => { setplanObj(defObj); setaddM(true); }}>Add Plan</Button>}
        </Box>

        <TableContainer component={Paper}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Intervention</TableCell>
                    <TableCell>Financial</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{planListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.activity}</TableCell>
                    <TableCell>{w.year}</TableCell>
                    <TableCell>{w.intervention}</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell>
                        <IconButton onClick={() => { seteditM(true); }}><Edit /></IconButton>
                    </TableCell>}
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={planListF.length}
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
            <DialogTitle>Add New Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider textAlign='left'>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Year' value={planObj.year} onChange={(e) => setplanObj({ ...planObj, year: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Intervention" value={planObj.activity} onChange={(e) => setplanObj({ ...planObj, activity: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Activity" value={planObj.intervention} onChange={(e) => setplanObj({ ...planObj, intervention: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Land Type" value={planObj.intervention} onChange={(e) => setplanObj({ ...planObj, intervention: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider textAlign='left'>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField label='State' value={planObj.year} onChange={(e) => setplanObj({ ...planObj, year: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="District" value={planObj.activity} onChange={(e) => setplanObj({ ...planObj, activity: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Taluk" value={planObj.intervention} onChange={(e) => setplanObj({ ...planObj, intervention: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Panchayat" value={planObj.intervention} onChange={(e) => setplanObj({ ...planObj, intervention: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Watershed" value={planObj.intervention} onChange={(e) => setplanObj({ ...planObj, intervention: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider textAlign='left'>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField label='Value' value={planObj.year} onChange={(e) => setplanObj({ ...planObj, year: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="UOM" value={planObj.activity} onChange={(e) => setplanObj({ ...planObj, activity: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider textAlign='left'>Financial Plan</Divider></Grid>
                <Grid item xs={3}><TextField type='number' label="BFIL" value={planObj.finBfil} onChange={(e) => setplanObj({ ...planObj, finBfil: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other Gov Schemes" value={planObj.finGov} onChange={(e) => setplanObj({ ...planObj, finGov: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other" value={planObj.finOther} onChange={(e) => setplanObj({ ...planObj, finOther: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="MGNREGA" value={planObj.finMgn} onChange={(e) => setplanObj({ ...planObj, finMgn: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="IBL" value={planObj.finIbl} onChange={(e) => setplanObj({ ...planObj, finIbl: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Community" value={planObj.finCom} onChange={(e) => setplanObj({ ...planObj, finCom: parseInt(e.target.value) })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField label="Total" value={planObj.finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }}>Close</Button>
                <Button onClick={() => { setaddM(false); }}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}