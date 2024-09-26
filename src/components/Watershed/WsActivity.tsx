import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography,
    MenuItem, IconButton, InputAdornment
} from "@mui/material";
import { Edit, Search, Add } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { WsName, DateTime, StateName, DistrictName, TalukName, PanName, VillageName } from '../../LocName';
import { fmrDef } from '../Farmer/FarmerMaster';
import { wsDef } from './WsMaster';
import { listAct, addAct, editAct } from '../../Services/activityService';
import { listFarmer } from '../../Services/farmerService';
import { idWS } from '../../Services/wsService';
import { listInt } from '../../Services/dashboardService';

export const actDef = {
    activityId: '',
    activityName: '',
    userId: '',
    activityDescription: '',
    activityWorkflowStatus: 'New',
    interventionType: '',
    activityImage: '',
    activityFormData: '',
    watershedId: '',
    farmerId: '',
    remarks: '',
    surveyNo: '',
    hissa: '',
    landType: '',
    areaTreated: '',
    total: '',
    waterConserved: '',
    amountSpend: '',
    sourceExpenditure: '',
    geotaggedPhoto: '',
    capacitytypeEvent: '',
    participantsType: '',
    capacitynameEvent: '',
    habitationsCovered: '',
    state: '',
    district: '',
    taluk: '',
    gramPanchayat: '',
    village: '',
    createdTime: '',
    createdUser: sessionStorage.getItem("userName") as string,
    updatedTime: '',
    updatedUser: sessionStorage.getItem("userName") as string,
    eventDate: '',
    participantsMale: '',
    participantsFemale: '',
    trainerFacilitator: '',
    mobilizer: '',
    photoEvent: '',
    photoattendanceResolution: ''
}

export const WsActivity: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [search, setsearch] = React.useState("");
    const [actObj, setactObj] = React.useState(actDef);
    const [actList, setactList] = React.useState<typeof actDef[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [fmrOps, setfmrOps] = React.useState<typeof fmrDef[]>([]);
    const [wsObj, setwsObj] = React.useState(wsDef);
    const [wsOps, setwsOps] = React.useState<typeof wsDef[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);

    const actListF = actList.filter((a) => {
        const searchTerm = search?.toLowerCase();
        return (
            WsName(a.watershedId)?.toString().toLowerCase().includes(searchTerm) ||
            a.interventionType?.toLowerCase().includes(searchTerm) ||
            a.activityName?.toLowerCase().includes(searchTerm) ||
            a.activityWorkflowStatus?.toLowerCase().includes(searchTerm) ||
            DateTime(a.updatedTime)?.toLowerCase().includes(searchTerm) ||
            a.updatedUser?.toLowerCase().includes(searchTerm)
        );
    });

    const actListP = actListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { FmrSet(actObj.farmerId) }, [actObj.farmerId])

    React.useEffect(() => { WsSet(actObj.watershedId) }, [actObj.watershedId])

    const fetchData = async () => {
        try {
            const resp1 = await listAct();
            if (resp1.status === 'success') { setactList(resp1.data) }
            const resp2 = await listFarmer();
            if (resp2.status === 'success') { setfmrOps(resp2.data) }
            setwsOps(JSON.parse(sessionStorage.getItem("WsList") as string))
        }
        catch (error) { console.log(error) }
    };

    const FmrSet = async (id: any) => {
        try {
            const resp1 = await listFarmer();
            if (resp1.status === 'success') {
                setfmrObj(resp1.data.find((x: typeof fmrDef) => x.wsfarmerId === id) || fmrDef)
            }
        }
        catch (error) { console.log(error) }
    }

    const WsSet = async (id: any) => {
        try {
            const resp1 = await idWS(id);
            if (resp1.status === 'success') {
                setwsObj(resp1.data || wsDef)
            }
        }
        catch (error) { console.log(error) }
    }

    const ActAdd = async () => {
        try {
            const resp1 = await addAct(actObj)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity added`);
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add activity");
        }
        setaddM(false);
    }

    const ActEdit = async (id: any) => {
        try {
            const resp1 = await editAct(actObj, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity ${actObj.activityName || ""} updated`);
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update activity");
        }
        seteditM(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Watershed Activity</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Watershed Activity') && (<Button startIcon={<Add />} title='Add activity'
                    onClick={() => { setactObj(actDef); setfmrObj(fmrDef); setwsObj(wsDef); setaddM(true); }} sx={{ height: '100%', ml: '4px' }}>Add Activity</Button>)}
            </div>
        </Box>

        {actList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Intervention</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Update On</TableCell>
                    <TableCell>Last Update By</TableCell>
                    {PerChk('EDIT_Watershed Activity') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{actListP.map((a, i) =>
            (<TableRow key={i}>
                <TableCell>{WsName(a.watershedId)}</TableCell>
                <TableCell>{a.interventionType}</TableCell>
                <TableCell>{a.activityName}</TableCell>
                <TableCell>{a.activityWorkflowStatus}</TableCell>
                <TableCell>{DateTime(a.updatedTime)}</TableCell>
                <TableCell>{a.updatedUser}</TableCell>
                {PerChk('EDIT_Watershed Activity') && <TableCell>
                    <IconButton title="Edit activity" onClick={() => { setactObj(a); seteditM(true); }}><Edit /></IconButton>
                </TableCell>}
            </TableRow>)
            )}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={actListF.length}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[5, 10, 15]}
                    onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                    ActionsComponent={TPA}
                />
            </TableRow></TableFooter>
        </Table></TableContainer>}

        <Dialog open={addM} maxWidth='xl'>
            <DialogTitle>Add Activity</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField select label="Intervention" value={actObj.interventionType} onChange={(e) => setactObj({ ...actObj, interventionType: e.target.value })}>
                    <MenuItem value='Supply Side Intervention'>Supply Side Intervention</MenuItem>
                    <MenuItem value='Demand Side Intervention'>Demand Side Intervention</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField label='Activity' value={actObj.activityName} onChange={(e) => setactObj({ ...actObj, activityName: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField select label='Watershed' value={actObj.watershedId} onChange={(e) => setactObj({ ...actObj, watershedId: e.target.value })}>
                    {wsOps?.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='State' value={StateName(1)} /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value={DistrictName(wsObj.districtId)} /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value={TalukName(wsObj.talukId)} /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value={PanName(wsObj.grampanchayatId)} /></Grid>
                <Grid item xs={3}><TextField disabled label='Village' value={VillageName(wsObj.villageId)} /></Grid>
                <Grid item xs={3}><TextField type='number' label='Survey No.' value={actObj.surveyNo} onChange={(e) => setactObj({ ...actObj, surveyNo: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider>Activity Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Total Units' value={actObj.total} onChange={(e) => setactObj({ ...actObj, total: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label='Land Type' value={actObj.landType} onChange={(e) => setactObj({ ...actObj, landType: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Water Conserved" value={actObj.waterConserved} onChange={(e) => setactObj({ ...actObj, waterConserved: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Funds spent" value={actObj.amountSpend} onChange={(e) => setactObj({ ...actObj, amountSpend: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Funds source" value={actObj.sourceExpenditure} onChange={(e) => setactObj({ ...actObj, sourceExpenditure: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                <Grid item xs={3}><TextField select label='Name' value={actObj.farmerId} onChange={(e) => setactObj({ ...actObj, farmerId: e.target.value })}>
                    {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>{o.wsfarmerName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='Aadhar' value={`${fmrObj.adharNumber.slice(0, -4).replace(/\d/g, '*')}${fmrObj.adharNumber.slice(-4)}`} /></Grid>
                <Grid item xs={3}><TextField disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Cancel</Button>
                <Button onClick={ActAdd}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM} maxWidth='xl'>
            <DialogTitle>Edit Activity</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField disabled select label="Intervention" value={actObj.interventionType} onChange={(e) => setactObj({ ...actObj, interventionType: e.target.value })}>
                    <MenuItem value='Supply Side Intervention'>Supply Side Intervention</MenuItem>
                    <MenuItem value='Demand Side Intervention'>Demand Side Intervention</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='Activity' value={actObj.activityName} /></Grid>
                <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Watershed' value={WsName(actObj.watershedId)} /></Grid>
                <Grid item xs={3}><TextField disabled label='State' value={actObj.state} /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value={actObj.district} /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value={actObj.taluk} /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value={actObj.gramPanchayat} /></Grid>
                <Grid item xs={3}><TextField disabled label='Village' value={actObj.village} /></Grid>
                <Grid item xs={3}><TextField disabled label='Survey No.' value={actObj.surveyNo} /></Grid>
                <Grid item xs={12}><Divider>Activity Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Total Units' value={actObj.total} onChange={(e) => setactObj({ ...actObj, total: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label='Land Type' value={actObj.landType} onChange={(e) => setactObj({ ...actObj, landType: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Water Conserved" value={actObj.waterConserved} onChange={(e) => setactObj({ ...actObj, waterConserved: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Funds spent" value={actObj.amountSpend} onChange={(e) => setactObj({ ...actObj, amountSpend: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Funds source" value={actObj.sourceExpenditure} onChange={(e) => setactObj({ ...actObj, sourceExpenditure: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Name' value={fmrObj.wsfarmerName} /></Grid>
                <Grid item xs={3}><TextField disabled label='Aadhar' value={`${fmrObj.adharNumber.slice(0, -4).replace(/\d/g, '*')}${fmrObj.adharNumber.slice(-4)}`} /></Grid>
                <Grid item xs={3}><TextField disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => seteditM(false)}>Cancel</Button>
                <Button onClick={() => ActEdit(actObj.activityId)}>Update</Button>
            </DialogActions>
        </Dialog>
    </>)
}