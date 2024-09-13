import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    MenuItem, Snackbar, InputAdornment
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk } from '../../common';
import { listFarmer, addFarmer } from '../../Services/farmerService';

const defObj = {
    wsfarmerName: "",
    adharNumber: "",
    mobileNumber: ""
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

    const addCheck = !planObj.wsfarmerName || planObj.adharNumber.length !== 12 || planObj.mobileNumber.length !== 10

    const planListF = planList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsfarmerName?.toLowerCase().includes(searchTerm) ||
            w.adharNumber?.toLowerCase().includes(searchTerm) ||
            w.mobileNumber?.toLowerCase().includes(searchTerm)
        );
    });

    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    return (<>
        <Snackbar open={Boolean(alert)} onClose={() => setalert(null)} autoHideDuration={3000} message={alert} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
            {PerChk('EDIT_Farmer Master') && <Button startIcon={<PersonAddAlt1 />} onClick={() => { setplanObj(defObj); setaddM(true); }}>Add Farmer</Button>}
        </Box>

        <TableContainer component={Paper}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Physical</TableCell>
                    <TableCell>Financial</TableCell>
                    {PerChk('EDIT_Farmer Master') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{planListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.adharNumber}</TableCell>
                    <TableCell>{w.wsfarmerName}</TableCell>
                    <TableCell>{w.mobileNumber}</TableCell>
                    {PerChk('EDIT_Farmer Master') && <TableCell>
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
            <DialogTitle>Add New Watershed</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Name' value={planObj.wsfarmerName} onChange={(e) => setplanObj({ ...planObj, wsfarmerName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField
                    label="Aadhar"
                    value={planObj.adharNumber}
                    onChange={(e) => { if (/^\d{0,12}$/.test(e.target.value)) { setplanObj({ ...planObj, adharNumber: e.target.value }) } }}
                    inputProps={{ maxLength: 12 }}
                    type="tel"
                />
                </Grid>
                <Grid item xs={12}><TextField
                    label="Mobile"
                    value={planObj.mobileNumber}
                    onChange={(e) => { if (/^\d{0,10}$/.test(e.target.value)) { setplanObj({ ...planObj, mobileNumber: e.target.value }); } }}
                    inputProps={{ maxLength: 10 }}
                    type="tel"
                />
                </Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }}>Close</Button>
                <Button onClick={() => { setaddM(false); }}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}