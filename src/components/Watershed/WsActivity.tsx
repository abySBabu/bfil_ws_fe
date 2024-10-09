import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography,
    MenuItem, IconButton, InputAdornment, CircularProgress
} from "@mui/material";
import { Edit, Search, Add, Info } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { DateTime } from '../../LocName';
import { fmrDef } from '../Farmer/FarmerMaster';
import { wsDef } from './WsMaster';
import { listAct, addAct, editAct, actFlowAdd, actFlowUpdate, actFlowSubmit } from '../../Services/activityService';
import { listFarmer } from '../../Services/farmerService';
import { ListDemand, ListSupply, ListInter, ListFund, ListLand } from '../../Services/dashboardService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { listWSMap } from '../../Services/wsMappingService';
import { listWS } from '../../Services/wsService';
import { StateName, DistrictName, TalukName, PanName, VillageName } from '../../LocName';

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
    unit: '',
    waterConserved: '',
    amountSpend: '',
    sourceExpenditure: '',
    geotaggedPhoto: '',
    capacitytypeEvent: '',
    participantsType: '',
    capacitynameEvent: '',
    habitationsCovered: '',
    state: 1,
    district: '',
    taluk: '',
    gramPanchayat: '',
    village: '',
    createdTime: '',
    createdUser: sessionStorage.getItem("userName") as string,
    updatedTime: '',
    updatedUser: sessionStorage.getItem("userName") as string,
    eventDate: '',
    participantsMale: 0,
    participantsFemale: 0,
    trainerFacilitator: '',
    mobilizer: '',
    photoEvent: '',
    photoattendanceResolution: ''
}

export const WsActivity: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [search, setsearch] = React.useState("");
    const [actObj, setactObj] = React.useState(actDef);
    const [actList, setactList] = React.useState<typeof actDef[]>([]);
    const [actOps, setactOps] = React.useState<any[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [fmrOps, setfmrOps] = React.useState<typeof fmrDef[]>([]);
    const [wsOps, setwsOps] = React.useState<typeof wsDef[]>([]);
    const [landOps, setlandOps] = React.useState<any[]>([]);
    const [fundOps, setfundOps] = React.useState<any[]>([]);
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [next, setnext] = React.useState('');

    const totalP = (actObj.participantsFemale || 0) + (actObj.participantsMale || 0)

    const actListF = actList.filter((a) => {
        const searchTerm = search?.toLowerCase();
        return (
            a.interventionType?.toLowerCase().includes(searchTerm) ||
            a.activityName?.toLowerCase().includes(searchTerm) ||
            a.activityWorkflowStatus?.toLowerCase().includes(searchTerm) ||
            DateTime(a.updatedTime)?.toLowerCase().includes(searchTerm) ||
            a.updatedUser?.toLowerCase().includes(searchTerm)
        );
    });

    const actListP = actListF.slice(page * rPP, page * rPP + rPP);

    const supplyCheck = !actObj.interventionType || !actObj.activityName || !actObj.watershedId || !actObj.surveyNo || !actObj.farmerId || !actObj.total || !actObj.landType || !actObj.waterConserved || !actObj.amountSpend || !actObj.sourceExpenditure

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { FmrSet(actObj.farmerId) }, [actObj.farmerId])

    React.useEffect(() => { WsSet(actObj.watershedId) }, [actObj.watershedId])

    React.useEffect(() => { ActSet() }, [actObj.interventionType])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.district) {
                    const resp = await talukById(actObj.district);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.district])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.taluk) {
                    const resp = await panchayatById(actObj.taluk);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.taluk])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.gramPanchayat) {
                    const resp = await VillageById(actObj.gramPanchayat);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.gramPanchayat])

    const fetchData = async () => {
        try {
            console.log('Role--', localStorage.getItem("userRole"))
            const uRole = localStorage.getItem("userRole")
            const resp0 = await listWSMap();
            if (resp0.status === 'success') {
                const found0: any = resp0.data.find((x: any) => x.userId === Number(sessionStorage.getItem("userId")))
                if (found0) {
                    const wsFil: number[] = found0.watershedId?.split(',').map((id: string) => Number(id.trim()))
                    const resp1 = await listAct();
                    if (resp1.status === 'success') {
                        const sortrespdata = resp1.data.reverse();
                        if (uRole === 'Chief Manager Head Office') { setactList(sortrespdata) }
                        else {
                            const found1: typeof actDef[] = sortrespdata.filter((x: typeof actDef) => wsFil.includes(Number(x.watershedId)));
                            if (found1) {
                                if (uRole === 'Community Resource person') { setactList(found1.filter((x: typeof actDef) => (x.activityWorkflowStatus === 'New' || x.activityWorkflowStatus === 'In Progress'))) }
                                if (uRole === 'Project Manager') { setactList(found1.filter((x: typeof actDef) => x.activityWorkflowStatus === 'Verification 1')) }
                                if (uRole === 'Program Officer') { setactList(found1.filter((x: typeof actDef) => x.activityWorkflowStatus === 'Verification 2')) }
                                if (uRole === 'Lead Agency') { setactList(found1.filter((x: typeof actDef) => x.activityWorkflowStatus === 'Verification 3')) }
                                if (uRole === 'Executive Director') { setactList(found1.filter((x: typeof actDef) => x.activityWorkflowStatus === 'Verification 4')) }
                                if (uRole === 'State Project Head') { setactList(found1.filter((x: typeof actDef) => x.activityWorkflowStatus === 'Verification 5')) }
                            }
                        }
                    }
                }
            }
            const resp2 = await listFarmer(); if (resp2.status === 'success') { setfmrOps(resp2.data) }
            const resp3 = await ListInter(); if (resp3.status === 'success') { setintOps(resp3.data) }
            const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }
            const resp5 = await ListFund(); if (resp5.status === 'success') { setfundOps(resp5.data) }
            const resp6 = await listWS(); if (resp6.status === 'success') { setwsOps(resp6.data) }
            setstOps(JSON.parse(sessionStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(sessionStorage.getItem("DistrictList") as string))
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
            const resp1 = JSON.parse(sessionStorage.getItem("WsList") as string)
            if (resp1) {
                const found: typeof wsDef = resp1.find((x: typeof wsDef) => x.wsId === id) || wsDef
                setactObj({
                    ...actObj,
                    state: 1,
                    district: found.district.districtId,
                    taluk: found.taluk.talukId,
                    gramPanchayat: found.gramPanchayat.panchayatId,
                    village: found.village.villageId
                })
            }
        }
        catch (error) { console.log(error) }
    }

    const ActSet = async () => {
        try {
            if (actObj.interventionType === 'Supply Side Interventions') {
                const resp1 = await ListSupply();
                if (resp1) { setactOps(resp1.data) }
            }
            else if (actObj.interventionType === 'Demand Side Interventions') {
                const resp1 = await ListDemand();
                if (resp1) { setactOps(resp1.data) }
            }
            else {
                setactOps([]);
            }
        }
        catch (error) { console.log(error) }
    }

    const districtCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            district: e.target.value,
            taluk: '',
            gramPanchayat: '',
            village: ''
        })
    }

    const talukCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            taluk: e.target.value,
            gramPanchayat: '',
            village: ''
        })
    }

    const panchayatCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            gramPanchayat: e.target.value,
            village: ''
        })
    }

    const ActAdd = async () => {
        setLoading(true);
        try {
            const resp1 = await addAct(actObj)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity added`);
            }
            else {
                setalertClr(false);
                setalert("Failed to add activity");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add activity");
        }
        setLoading(false);
        setaddM(false);
    }

    const ActEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp1 = await editAct(actObj, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity updated`);
            }
            else {
                setalertClr(false);
                setalert("Failed to update activity");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update activity");
        }
        setLoading(false);
        seteditM(false);
    }

    const ActFlow = async (status: any, id: any) => {
        try {
            const resp1 = status === 'New' ? await actFlowAdd()
                : status === 'Verification 6' ? await actFlowSubmit()
                    : await actFlowUpdate(status)
            if (resp1) {
                const stObj = { ...actObj, activityWorkflowStatus: resp1 }
                const resp2 = await editAct(stObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated activity status to ${resp1}`);
                }
                else {
                    setalertClr(false);
                    setalert("Failed to update work flow status");
                }
            }
            else {
                setalertClr(false);
                setalert("Failed to update work flow status");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update work flow status");
        }
        seteditM(false);
    }

    React.useEffect(() => { ActFlowSet(actObj.activityWorkflowStatus) }, [actObj.activityWorkflowStatus])

    const ActFlowSet = async (status: any) => {
        try {
            const resp1 = status === 'New' ? await actFlowAdd()
                : status === 'Verification 6' ? await actFlowSubmit()
                    : await actFlowUpdate(status)
            if (resp1) { setnext(resp1) }

        }
        catch (error) { console.log(error) }
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Watershed Activity</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Watershed Activity') && (<Button startIcon={<Add />}
                    onClick={() => { setactObj(actDef); setfmrObj(fmrDef); setaddM(true); }} sx={{ height: '100%', ml: '4px' }}>Add Activity</Button>)}
            </div>
        </Box>

        {actList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}><Table>
            <TableHead>
                <TableRow>
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
                <TableCell>{a.interventionType}</TableCell>
                <TableCell>{a.activityName}</TableCell>
                <TableCell>{a.activityWorkflowStatus}</TableCell>
                <TableCell>{DateTime(a.updatedTime)}</TableCell>
                <TableCell>{a.updatedUser}</TableCell>
                {PerChk('EDIT_Watershed Activity') && <TableCell>
                    <IconButton title="Edit activity" onClick={() => { setactObj(a); seteditM(true); }}>{a.activityWorkflowStatus === 'Completed' ? <Info /> : <Edit />}</IconButton>
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
                <Grid item xs={3}><TextField required select label="Intervention" value={actObj.interventionType} onChange={(e) => setactObj({ ...actObj, interventionType: e.target.value, activityName: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label='Activity' value={actObj.activityName} onChange={(e) => setactObj({ ...actObj, activityName: e.target.value })} disabled={actOps?.length <= 0}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                {actObj.activityName === 'Sustainable Practices' && <Grid item xs={3}><TextField required label='Sustainable Practice' value={actObj.activityDescription} onChange={(e) => setactObj({ ...actObj, activityDescription: e.target.value })} /></Grid>}
                {actObj.activityName === 'Members Capacitated' ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required label='Event Name' value={actObj.capacitynameEvent} onChange={(e) => setactObj({ ...actObj, capacitynameEvent: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required label='Event Type' value={actObj.capacitytypeEvent} onChange={(e) => setactObj({ ...actObj, capacitytypeEvent: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required type='date' label='Event Date' value={actObj.eventDate} onChange={(e) => setactObj({ ...actObj, eventDate: e.target.value })} onKeyDown={(e) => e.preventDefault()} InputLabelProps={{ shrink: true }} /></Grid>
                    <Grid item xs={3}><TextField required label='Target Group' value={actObj.participantsType} onChange={(e) => setactObj({ ...actObj, participantsType: e.target.value })} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required select label='State' value={actObj.state} disabled>
                        {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='District' value={actObj.district} onChange={(e) => districtCh(e)} >
                        {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Taluk' value={actObj.taluk} onChange={(e) => talukCh(e)} >
                        {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Panchayat' value={actObj.gramPanchayat} onChange={(e) => panchayatCh(e)} >
                        {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Habitation' value={actObj.habitationsCovered} onChange={(e) => setactObj({ ...actObj, habitationsCovered: e.target.value })}>
                        {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Total Participants' value={totalP} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Male Participants' value={actObj.participantsMale} onChange={(e) => setactObj({ ...actObj, participantsMale: parseInt(e.target.value) })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Female Participants' value={actObj.participantsFemale} onChange={(e) => setactObj({ ...actObj, participantsFemale: parseInt(e.target.value) })} inputProps={{ min: 0 }} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required label='Facilitator' value={actObj.trainerFacilitator} onChange={(e) => setactObj({ ...actObj, trainerFacilitator: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required label='Mobilizer' value={actObj.mobilizer} onChange={(e) => setactObj({ ...actObj, mobilizer: e.target.value })} /></Grid>
                    <Grid item xs={6}><TextField required label='Remarks' value={actObj.remarks} onChange={(e) => setactObj({ ...actObj, remarks: e.target.value })} /></Grid>
                </> : <>
                    <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Watershed' value={actObj.watershedId} onChange={(e) => setactObj({ ...actObj, watershedId: e.target.value })}>
                        {wsOps?.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='State' value={StateName(actObj.state)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='District' value={DistrictName(actObj.district)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Taluk' value={TalukName(actObj.taluk)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Panchayat' value={PanName(actObj.gramPanchayat)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Village' value={VillageName(actObj.village)} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Survey No.' value={actObj.surveyNo} onChange={(e) => setactObj({ ...actObj, surveyNo: e.target.value })} /></Grid>

                    <Grid item xs={12}><Divider>Activity Details</Divider></Grid>
                    <Grid item xs={2}><TextField type='number' required label='Total Value' value={actObj.total} onChange={(e) => setactObj({ ...actObj, total: e.target.value })} /></Grid>
                    <Grid item xs={1}><TextField required label='Unit' value={actObj.unit} onChange={(e) => setactObj({ ...actObj, unit: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label='Area Treated (acres)' value={actObj.areaTreated} onChange={(e) => setactObj({ ...actObj, areaTreated: e.target.value })} /></Grid>
                    {actObj.interventionType !== 'Demand Side Interventions' && <>
                        <Grid item xs={3}><TextField required select label='Land Type' value={actObj.landType} onChange={(e) => setactObj({ ...actObj, landType: e.target.value })}>
                            {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={3}><TextField type='number' required label="Water Conserved (litres)" value={actObj.waterConserved} onChange={(e) => setactObj({ ...actObj, waterConserved: e.target.value })} /></Grid>
                    </>}
                    <Grid item xs={3}><TextField type='number' required label="Funds spent (₹)" value={actObj.amountSpend} onChange={(e) => setactObj({ ...actObj, amountSpend: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required select label="Funds source" value={actObj.sourceExpenditure} onChange={(e) => setactObj({ ...actObj, sourceExpenditure: e.target.value })}>
                        {fundOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Name' value={actObj.farmerId} onChange={(e) => setactObj({ ...actObj, farmerId: e.target.value })}>
                        {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>{o.wsfarmerName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='Aadhar' value={`${fmrObj.adharNumber.slice(0, -4).replace(/\d/g, '*')}${fmrObj.adharNumber.slice(-4)}`} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
                </>}
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)} disabled={loading}>Cancel</Button>
                <Button onClick={ActAdd} disabled={loading || supplyCheck} startIcon={loading ? <CircularProgress /> : null}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM} maxWidth='xl'>
            <DialogTitle>Edit Activity</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField required select label="Intervention" value={actObj.interventionType} onChange={(e) => setactObj({ ...actObj, interventionType: e.target.value, activityName: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label='Activity' value={actObj.activityName} onChange={(e) => setactObj({ ...actObj, activityName: e.target.value })} disabled={actOps?.length <= 0}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                {actObj.activityName === 'Sustainable Practices' && <Grid item xs={3}><TextField required label='Sustainable Practice' value={actObj.activityDescription} onChange={(e) => setactObj({ ...actObj, activityDescription: e.target.value })} /></Grid>}
                {actObj.activityName === 'Members Capacitated' ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required label='Event Name' value={actObj.capacitynameEvent} onChange={(e) => setactObj({ ...actObj, capacitynameEvent: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required label='Event Type' value={actObj.capacitytypeEvent} onChange={(e) => setactObj({ ...actObj, capacitytypeEvent: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required type='date' label='Event Date' value={actObj.eventDate} onChange={(e) => setactObj({ ...actObj, eventDate: e.target.value })} onKeyDown={(e) => e.preventDefault()} InputLabelProps={{ shrink: true }} /></Grid>
                    <Grid item xs={3}><TextField required label='Target Group' value={actObj.participantsType} onChange={(e) => setactObj({ ...actObj, participantsType: e.target.value })} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required select label='State' value={actObj.state} disabled>
                        {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='District' value={actObj.district} onChange={(e) => districtCh(e)} >
                        {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Taluk' value={actObj.taluk} onChange={(e) => talukCh(e)} >
                        {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Panchayat' value={actObj.gramPanchayat} onChange={(e) => panchayatCh(e)} >
                        {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Habitation' value={actObj.habitationsCovered} onChange={(e) => setactObj({ ...actObj, habitationsCovered: e.target.value })}>
                        {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Total Participants' value={totalP} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Male Participants' value={actObj.participantsMale} onChange={(e) => setactObj({ ...actObj, participantsMale: parseInt(e.target.value) })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Female Participants' value={actObj.participantsFemale} onChange={(e) => setactObj({ ...actObj, participantsFemale: parseInt(e.target.value) })} inputProps={{ min: 0 }} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required label='Facilitator' value={actObj.trainerFacilitator} onChange={(e) => setactObj({ ...actObj, trainerFacilitator: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required label='Mobilizer' value={actObj.mobilizer} onChange={(e) => setactObj({ ...actObj, mobilizer: e.target.value })} /></Grid>
                    <Grid item xs={6}><TextField required label='Remarks' value={actObj.remarks} onChange={(e) => setactObj({ ...actObj, remarks: e.target.value })} /></Grid>
                </> : <>
                    <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Watershed' value={actObj.watershedId} onChange={(e) => setactObj({ ...actObj, watershedId: e.target.value })}>
                        {wsOps?.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='State' value={StateName(actObj.state)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='District' value={DistrictName(actObj.district)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Taluk' value={TalukName(actObj.taluk)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Panchayat' value={PanName(actObj.gramPanchayat)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Village' value={VillageName(actObj.village)} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Survey No.' value={actObj.surveyNo} onChange={(e) => setactObj({ ...actObj, surveyNo: e.target.value })} /></Grid>

                    <Grid item xs={12}><Divider>Activity Details</Divider></Grid>
                    <Grid item xs={2}><TextField type='number' required label='Total Value' value={actObj.total} onChange={(e) => setactObj({ ...actObj, total: e.target.value })} /></Grid>
                    <Grid item xs={1}><TextField required label='Unit' value={actObj.unit} onChange={(e) => setactObj({ ...actObj, unit: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label='Area Treated (acres)' value={actObj.areaTreated} onChange={(e) => setactObj({ ...actObj, areaTreated: e.target.value })} /></Grid>
                    {actObj.interventionType !== 'Demand Side Interventions' && <>
                        <Grid item xs={3}><TextField required select label='Land Type' value={actObj.landType} onChange={(e) => setactObj({ ...actObj, landType: e.target.value })}>
                            {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={3}><TextField type='number' required label="Water Conserved (litres)" value={actObj.waterConserved} onChange={(e) => setactObj({ ...actObj, waterConserved: e.target.value })} /></Grid>
                    </>}
                    <Grid item xs={3}><TextField type='number' required label="Funds spent (₹)" value={actObj.amountSpend} onChange={(e) => setactObj({ ...actObj, amountSpend: e.target.value })} /></Grid>
                    <Grid item xs={3}><TextField required select label="Funds source" value={actObj.sourceExpenditure} onChange={(e) => setactObj({ ...actObj, sourceExpenditure: e.target.value })}>
                        {fundOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Name' value={actObj.farmerId} onChange={(e) => setactObj({ ...actObj, farmerId: e.target.value })}>
                        {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>{o.wsfarmerName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='Aadhar' value={`${fmrObj.adharNumber.slice(0, -4).replace(/\d/g, '*')}${fmrObj.adharNumber.slice(-4)}`} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
                </>}
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => seteditM(false)} disabled={loading}>Cancel</Button>
                {actObj.activityWorkflowStatus !== 'Completed' && <>
                    <Button onClick={() => ActEdit(actObj.activityId)} disabled={loading} startIcon={loading ? <CircularProgress /> : null}>Update</Button>
                    <Button onClick={() => ActFlow(actObj.activityWorkflowStatus, actObj.activityId)}>Submit for {next}</Button>
                </>}
            </DialogActions>
        </Dialog>
    </>)
}