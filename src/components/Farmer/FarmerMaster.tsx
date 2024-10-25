import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Paper,
    InputAdornment, Typography, CircularProgress, MenuItem, Divider
} from "@mui/material";
import { Edit, PersonAdd, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listFarmer, addFarmer, editFarmer, deleteFarmer } from '../../Services/farmerService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';

export const fmrDef = {
    wsfarmerId: "",
    adharNumber: "",
    mobileNumber: "",
    wsfarmerName: "",
    state: "1",
    district: "",
    taluk: "",
    panchayat: "",
    village: "",
    remarks: "",
    createdUser: "",
    createTime: "",
    updatedUser: "",
    updatedTime: "",
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
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);

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

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.district) {
                    const resp = await talukById(fmrObj.district);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.district])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.taluk) {
                    const resp = await panchayatById(fmrObj.taluk);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.taluk])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.panchayat) {
                    const resp = await VillageById(fmrObj.panchayat);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.panchayat])

    const fetchData = async () => {
        try {
            const resp1 = await listFarmer();
            if (resp1.status === 'success') { setfmrList(resp1.data.reverse()); }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
        setLoadingResponse(false);
    };

    const districtCh = (e: any) => {
        setfmrObj({
            ...fmrObj,
            district: e,
            taluk: '',
            panchayat: '',
            village: ''
        })
    }

    const talukCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            taluk: e,
            panchayat: '',
            village: ''
        })
    }

    const panchayatCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            panchayat: e,
            village: ''
        })
    }

    const villageCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            village: e
        })
    }

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

                <Dialog open={addM || editM}>
                    <DialogTitle>{addM ? 'Add New Beneficiary' : editM ? 'Edit beneficiary' : ''}</DialogTitle>

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
                        <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>
                        <Grid item xs={4}><TextField disabled required select label='State' value={fmrObj.state}>
                            {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={4}><TextField disabled={dsOps?.length <= 0} required select label='District' value={fmrObj.district} onChange={(e) => districtCh(e.target.value)}>
                            {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={4}><TextField disabled={tlOps?.length <= 0} required select label='Taluk' value={fmrObj.taluk} onChange={(e) => talukCh(e.target.value)}>
                            {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={4}><TextField disabled={panOps?.length <= 0} required select label="Grampanchayat" value={fmrObj.panchayat} onChange={(e) => panchayatCh(e.target.value)}>
                            {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={4}><TextField disabled={vilOps?.length <= 0} required select label="Village" value={fmrObj.village} onChange={(e) => villageCh(e.target.value)}>
                            {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                        </TextField></Grid>
                    </Grid></DialogContent>

                    <DialogActions>
                        <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>Cancel</Button>
                        {addM && <Button startIcon={loading ? <CircularProgress /> : null} onClick={fmrAdd} disabled={addCheck}>Add</Button>}
                        {editM && <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => { fmrEdit(fmrObj.wsfarmerId) }} disabled={addCheck}>Update</Button>}
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