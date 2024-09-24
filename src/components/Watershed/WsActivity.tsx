import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography,
    MenuItem, IconButton, InputAdornment
} from "@mui/material";
import { Edit, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { WsName } from '../../LocName';
import { fmrDef } from '../Farmer/FarmerMaster';
import { listAct, editAct } from '../../Services/activityService';
import { listFarmer } from '../../Services/farmerService';

export const actDef = {
    activityId: '',
    activityName: '',
    userId: '',
    activityDescription: '',
    activityWorkflowStatus: '',
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
    const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
    const [editM, seteditM] = React.useState(false);
    const [alert, setalert] = React.useState<string | null>(null);
    const [alertClr, setalertClr] = React.useState(false);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { FmrSet(actObj.farmerId) }, [actObj.farmerId])

    const fetchData = async () => {
        try {
            const resp1 = await listAct();
            if (resp1.status === 'success') { setactList(resp1.data) }
        }
        catch (error) { console.log(error) }
    };

    const FmrSet = async (id: any) => {
        try {
            const resp = await listFarmer();
            if (resp.status === 'success') {
                setfmrList(resp.data)
                setfmrObj(resp.data.find((x: typeof fmrDef) => x.wsfarmerId === id))
            }
        }
        catch (error) { console.log(error) }
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
            <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
        </Box>

        {actList?.length <= 0 ? <Typography variant='h6' sx={{ mt: 4, textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '550px' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Intervention</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Total Units</TableCell>
                    {PerChk('EDIT_Watershed Activity') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{actList.map((a, i) =>
            (<TableRow key={i}>
                <TableCell>{WsName(a.watershedId)}</TableCell>
                <TableCell>{a.interventionType}</TableCell>
                <TableCell>{a.activityName}</TableCell>
                <TableCell>{a.total}</TableCell>
                {PerChk('EDIT_Watershed Activity') && <TableCell>
                    <IconButton onClick={() => { setactObj(a); seteditM(true); }}><Edit /></IconButton>
                </TableCell>}
            </TableRow>)
            )}</TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={actList.length}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[5, 10, 15]}
                    onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                    ActionsComponent={TPA}
                />
            </TableRow></TableFooter>
        </Table></TableContainer>}

        <Dialog open={editM} maxWidth='xl'>
            <DialogTitle>{actObj.activityName}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField disabled label='Intervention Type' value={actObj.interventionType} /></Grid>
                <Grid item xs={3}><TextField disabled label='Activity' value={actObj.activityName} /></Grid>
                <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Watershed' value={WsName(actObj.watershedId)} /></Grid>
                <Grid item xs={3}><TextField disabled label='State' value={actObj.state} /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value={actObj.district} /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value={actObj.taluk} /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value={actObj.gramPanchayat} /></Grid>
                <Grid item xs={3}><TextField select label='Villages' value="" /></Grid>
                <Grid item xs={3}><TextField select label='Survey Numbers' value={actObj.surveyNo} /></Grid>
                <Grid item xs={12}><Divider>Activity Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Total Units' value={actObj.total} /></Grid>
                <Grid item xs={3}><TextField select label='Land Type' value={actObj.landType}>
                    <MenuItem value='Wet land'>Type A</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField label="Water Conserved" value={actObj.waterConserved} /></Grid>
                <Grid item xs={3}><TextField label="Funds spent" value={actObj.amountSpend} /></Grid>
                <Grid item xs={3}><TextField label="Funds source" value={actObj.sourceExpenditure} /></Grid>
                <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Name' value={fmrObj.wsfarmerName} /></Grid>
                <Grid item xs={3}><TextField select label='Aadhar' value={fmrObj.adharNumber}>
                    <MenuItem value='**** **** 7251'>**** **** 7251</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => seteditM(false)}>Close</Button>
                <Button onClick={() => ActEdit(actObj.activityId)}>Update</Button>
            </DialogActions>
        </Dialog>
    </>)
}