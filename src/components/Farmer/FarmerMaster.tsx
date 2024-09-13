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

export const FarmerMaster: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [fmrList, setfmrList] = React.useState<typeof defObj[]>([]);
    const [fmrObj, setfmrObj] = React.useState(defObj);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState<string | null>(null);

    const addCheck = !fmrObj.wsfarmerName || fmrObj.adharNumber.length !== 12 || fmrObj.mobileNumber.length !== 10

    const fmrListF = fmrList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsfarmerName?.toLowerCase().includes(searchTerm) ||
            w.adharNumber?.toString().toLowerCase().includes(searchTerm) ||
            w.mobileNumber?.toString().toLowerCase().includes(searchTerm)
        );
    });

    const fmrListP = fmrListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const resp1 = await listFarmer(); if (resp1) {
                setfmrList(resp1)
            }
        }
        catch (error) { console.log(error) }
    };

    const fmrAdd = async () => {
        try {
            const resp = await addFarmer(fmrObj)
            if (resp) {
                setaddM(false); fetchData();
                setalert("Farmer added");
            }
        }
        catch (error) {
            console.log(error);
            setalert("Failed to add farmer");
        }
        setaddM(false);
    }
    return (<>
        <Snackbar open={Boolean(alert)} onClose={() => setalert(null)} autoHideDuration={3000} message={alert} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
            {PerChk('EDIT_Farmer Master') && <Button startIcon={<PersonAddAlt1 />} onClick={() => { setfmrObj(defObj); setaddM(true); }}>Add Farmer</Button>}
        </Box>

        <TableContainer component={Paper}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Aadhar</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Number</TableCell>
                    {PerChk('EDIT_Farmer Master') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{fmrListP.map((w, i) => (
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
                    count={fmrListF.length}
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
                <Grid item xs={12}><TextField label='Name' value={fmrObj.wsfarmerName} onChange={(e) => setfmrObj({ ...fmrObj, wsfarmerName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField
                    label="Aadhar"
                    value={fmrObj.adharNumber}
                    onChange={(e) => { if (/^\d{0,12}$/.test(e.target.value)) { setfmrObj({ ...fmrObj, adharNumber: e.target.value }) } }}
                    inputProps={{ maxLength: 12 }}
                    type="tel"
                />
                </Grid>
                <Grid item xs={12}><TextField
                    label="Mobile"
                    value={fmrObj.mobileNumber}
                    onChange={(e) => { if (/^\d{0,10}$/.test(e.target.value)) { setfmrObj({ ...fmrObj, mobileNumber: e.target.value }); } }}
                    inputProps={{ maxLength: 10 }}
                    type="tel"
                />
                </Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }}>Close</Button>
                <Button onClick={fmrAdd} /* disabled={addCheck} */>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}