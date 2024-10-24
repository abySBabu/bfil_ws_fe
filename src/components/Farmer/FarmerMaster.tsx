import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Paper,
    InputAdornment, Typography, CircularProgress
} from "@mui/material";
import { Edit, PersonAdd, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listFarmer, addFarmer, editFarmer, deleteFarmer } from '../../Services/farmerService';

export const fmrDef = {
    wsfarmerId: "",
    adharNumber: "",
    mobileNumber: "",
    wsfarmerName: "",
    createdUser: "",
    updatedUser: "",
    updatedTime: "",
    remarks: "",
    createTime: ""
}

export const FarmerMaster: React.FC = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [deleteM, setdeleteM] = React.useState("");
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState("");
    const [alertClr, setalertClr] = React.useState(false);
    const [isTouched, setIsTouched] = React.useState({ wsfarmerName: false, adharNumber: false, mobileNumber: false });

    const handleFieldChange = (field: string, value: string, validator: (value: string) => boolean) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        if (validator(value)) {
            setfmrObj((prev) => ({ ...prev, [field]: value }));
        }
    };

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
            const resp1 = await listFarmer();
            if (resp1.status === 'success') { setfmrList(resp1.data.reverse()); }
        }
        catch (error) { console.log(error) }
        setLoadingResponse(false);
    };

    const fmrAdd = async () => {
        setLoading(true);
        try {
            const resp = await addFarmer(fmrObj)
            if (resp.status === 'success') {
                fetchData();
                setalertClr(true);
                setalert("Beneficiary added");
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to add beneficiary");
            }
        }
        catch (error) {
            console.log(error);
            setalertClr(false);
            setalert("Failed to add beneficiary");
        }
        setLoading(false);
        setaddM(false);
    }

    const fmrEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp = await editFarmer(fmrObj, id)
            if (resp.status === 'success') {
                fetchData();
                setalertClr(true);
                setalert("Beneficiary edited");
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to edit beneficiary");
            }
        }
        catch (error) {
            console.log(error);
            setalertClr(false);
            setalert("Failed to edit beneficiary");
        }
        setLoading(false);
        seteditM(false);
    }

    const fmrDelete = async (id: any) => {
        setLoading(true);
        try {
            const resp = await deleteFarmer(id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Beneficiary deleted`);
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to delete beneficiary");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to delete beneficiary");
        }
        setLoading(false);
        setdeleteM('');
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />
        {loadingResponse ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={80} />
            </Box> : <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top', height: '10%' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Beneficiary Master</Typography>
                    <div>
                        <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                        {PerChk('EDIT_Farmer Master') && <Button startIcon={<PersonAdd />} sx={{ ml: '4px', height: '48px' }}
                            onClick={() => { setfmrObj(fmrDef); setaddM(true); setIsTouched({ wsfarmerName: false, adharNumber: false, mobileNumber: false }); }}>Add Beneficiary</Button>}
                    </div>
                </Box>
                {fmrList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
                    No records
                </Typography> : <TableContainer component={Paper} sx={{ height: '90%' }}><Table sx={{ height: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Aadhar</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            {PerChk('EDIT_Farmer Master') && <TableCell width='5%'>Actions</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>{fmrListP.map((w, i) => (
                        <TableRow key={i}>
                            <TableCell>{w.wsfarmerName}</TableCell>
                            <TableCell>{`${w.adharNumber.slice(0, -4).replace(/\d/g, '*')}${w.adharNumber.slice(-4)}`}</TableCell>
                            <TableCell>{w.mobileNumber}</TableCell>
                            {PerChk('EDIT_Farmer Master') && <TableCell>
                                <IconButton title="Edit beneficiary" onClick={() => { setfmrObj(w); seteditM(true); }}><Edit /></IconButton>
                                <IconButton title="Delete beneficiary" onClick={() => { setdeleteM(w.wsfarmerId) }}><Delete /></IconButton>
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
                </Table></TableContainer>}

                <Dialog open={addM} maxWidth='sm'>
                    <DialogTitle>Add New Beneficiary</DialogTitle>

                    <DialogContent><Grid container spacing={1} sx={{ my: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Name"
                                value={fmrObj.wsfarmerName}
                                onChange={(e) => handleFieldChange('wsfarmerName', e.target.value, (value) => /^[A-Za-z\s]*$/.test(value))}
                                helperText={isTouched.wsfarmerName && fmrObj.wsfarmerName.length === 0 ? 'Name cannot be empty' : ''}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Aadhar"
                                value={fmrObj.adharNumber}
                                onChange={(e) => handleFieldChange('adharNumber', e.target.value, (value) => /^\d{0,12}$/.test(value))}
                                inputProps={{ maxLength: 12 }}
                                type="tel"
                                helperText={isTouched.adharNumber && fmrObj.adharNumber.length !== 12 ? 'Aadhar number should have 12 digits' : ''}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Mobile"
                                value={fmrObj.mobileNumber}
                                onChange={(e) => handleFieldChange('mobileNumber', e.target.value, (value) => /^\d{0,10}$/.test(value))}
                                inputProps={{ maxLength: 10 }}
                                type="tel"
                                helperText={isTouched.mobileNumber && fmrObj.mobileNumber.length !== 10 ? 'Mobile number should have 10 digits' : ''}
                            />
                        </Grid>
                    </Grid></DialogContent>

                    <DialogActions>
                        <Button onClick={() => { setaddM(false); }} disabled={loading}>Cancel</Button>
                        <Button startIcon={loading ? <CircularProgress /> : null} onClick={fmrAdd} disabled={addCheck || loading}>Add</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editM} maxWidth='sm'>
                    <DialogTitle>Edit beneficiary</DialogTitle>

                    <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                        <Grid item xs={12}><TextField
                            required
                            label="Name"
                            value={fmrObj.wsfarmerName}
                            onChange={(e) => {
                                const regex = /^[A-Za-z\s]*$/;
                                if (regex.test(e.target.value)) {
                                    setfmrObj({ ...fmrObj, wsfarmerName: e.target.value });
                                }
                            }}
                            helperText={fmrObj.wsfarmerName.length === 0 ? 'Name cannot be empty' : ''}
                        /></Grid>
                        <Grid item xs={6}><TextField
                            disabled
                            required
                            label="Aadhar"
                            value={fmrObj.adharNumber}
                            onChange={(e) => { if (/^\d{0,12}$/.test(e.target.value)) { setfmrObj({ ...fmrObj, adharNumber: e.target.value }) } }}
                            inputProps={{ maxLength: 12 }}
                            type="tel"
                            helperText={fmrObj.adharNumber.length !== 12 ? 'Aadhar number should have 12 digits' : ''}
                        /></Grid>
                        <Grid item xs={6}><TextField
                            required
                            label="Mobile"
                            value={fmrObj.mobileNumber}
                            onChange={(e) => { if (/^\d{0,10}$/.test(e.target.value)) { setfmrObj({ ...fmrObj, mobileNumber: e.target.value }); } }}
                            inputProps={{ maxLength: 10 }}
                            type="tel"
                            helperText={fmrObj.mobileNumber.length !== 10 ? 'Mobile number should have 10 digits' : ''}
                        /></Grid>
                    </Grid></DialogContent>

                    <DialogActions>
                        <Button onClick={() => { seteditM(false); }} disabled={loading}>Cancel</Button>
                        <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => { fmrEdit(fmrObj.wsfarmerId) }} disabled={addCheck || loading}>Update</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={Boolean(deleteM)} maxWidth='xs'>
                    <DialogTitle>Delete beneficiary</DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>Are you sure you want to delete this beneficiary?</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setdeleteM('')} disabled={loading}>Cancel</Button>
                        <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => fmrDelete(deleteM)} disabled={loading}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </>}
    </>)
}