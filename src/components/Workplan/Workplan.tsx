import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    Typography, InputAdornment, MenuItem
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { wsDef } from '../Watershed/WsMaster';
import { StateName, DistrictName, TalukName, PanName } from '../../LocName';
import { listWP, addWP, editWP } from '../../Services/workplanService';

const wpDef = {
    planningId: "",
    planningYear: "",
    watershedId: "",
    interventionType_Components: "",
    activityId: "",
    planlandType: "",
    planRemarks: "",
    createdUser: "",
    updatedUser: "",
    unitofMeasurement: "",
    plan: "",
    value: "",
    financialDetails: [
        {
            wfsId: 101,
            wfsName: "BFIL",
            wfsValue: 0,

        },
        {
            wfsId: 102,
            wfsName: "Other",
            wfsValue: 0,
        }
    ]
}

export const Workplan: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [planList, setplanList] = React.useState<typeof wpDef[]>([]);
    const [planObj, setplanObj] = React.useState(wpDef);
    const [wsObj, setwsObj] = React.useState(wsDef);
    const [wsOps, setwsOps] = React.useState<typeof wsDef[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [finTotal, setfinTotal] = React.useState(0);

    const planListF = planList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.planningYear?.toString().toLowerCase().includes(searchTerm) ||
            w.activityId?.toString().toLowerCase().includes(searchTerm) ||
            w.interventionType_Components?.toString().toLowerCase().includes(searchTerm)
        );
    });

    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { WsSet(planObj.watershedId) }, [planObj.watershedId])

    React.useEffect(() => {
        const totalWfsValue = wpDef.financialDetails.reduce((sum, item) => {
            return sum + item.wfsValue;
        }, 0);
        setfinTotal(totalWfsValue);
    }, [wpDef.financialDetails.map(item => item.wfsValue)]);


    const fetchData = async () => {
        try {
            const resp1 = await listWP();
            if (resp1.status === 'success' && resp1.data) {
                setplanList(resp1.data)
            }
            setwsOps(JSON.parse(sessionStorage.getItem("WsList") as string))
        }
        catch (error) { console.log(error) }
    }

    const WsSet = async (id: any) => {
        setwsObj(wsOps.find((x: typeof wsDef) => x.wsId === id) || wsDef);
    }

    const PlanAdd = async () => {
        setLoading(true);
        try {
            const resp1 = await addWP(planObj)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Plan added`);
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add plan");
        }
        setLoading(false);
        setaddM(false);
    }

    const PlanEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp1 = await editWP(planObj, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Plan updated`);
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update plan");
        }
        setLoading(false);
        seteditM(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Work Plan</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Work Plan') && <Button startIcon={<PersonAddAlt1 />} onClick={() => { setplanObj(wpDef); setaddM(true); }} sx={{ height: '100%', ml: '4px' }}>Add Plan</Button>}
            </div>
        </Box>

        {planList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Physical</TableCell>
                    <TableCell>Financial</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{planListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.watershedId}</TableCell>
                    <TableCell>{w.planningYear}</TableCell>
                    <TableCell>{w.interventionType_Components}</TableCell>
                    <TableCell>{w.value} {w.unitofMeasurement}</TableCell>
                    <TableCell>{w.wfsValue}</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell>
                        <IconButton onClick={() => { seteditM(true); }}><Edit /></IconButton>
                    </TableCell>}
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow><TablePagination
                count={planListF.length}
                rowsPerPage={rPP}
                page={page}
                onPageChange={(e, p) => setPage(p)}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                ActionsComponent={TPA}
            /></TableRow></TableFooter>
        </Table></TableContainer>}

        <Dialog open={addM}>
            <DialogTitle>Add Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Year' value={planObj.planningYear} onChange={(e) => setplanObj({ ...planObj, planningYear: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value })}>
                    <MenuItem value='Supply'>Supply Side</MenuItem>
                    <MenuItem value='Demand'>Demand Side</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField label="Activity" value={planObj.activityId} onChange={(e) => setplanObj({ ...planObj, activityId: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>
                <Grid item xs={3}><TextField select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                <Grid item xs={3}><TextField type='number' label="BFIL" value={planObj.finBfil} onChange={(e) => setplanObj({ ...planObj, finBfil: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other Gov Schemes" value={planObj.finGov} onChange={(e) => setplanObj({ ...planObj, finGov: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other" value={planObj.finOther} onChange={(e) => setplanObj({ ...planObj, finOther: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="MGNREGA" value={planObj.finMgn} onChange={(e) => setplanObj({ ...planObj, finMgn: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="IBL" value={planObj.finIbl} onChange={(e) => setplanObj({ ...planObj, finIbl: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Community" value={planObj.finCom} onChange={(e) => setplanObj({ ...planObj, finCom: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField label="Total" value={planObj.wfsValue} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }} disabled={loading}>Close</Button>
                <Button onClick={PlanAdd} disabled={loading}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Year' value={planObj.planningYear} onChange={(e) => setplanObj({ ...planObj, planningYear: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value })}>
                    <MenuItem value='Supply'>Supply Side</MenuItem>
                    <MenuItem value='Demand'>Demand Side</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField label="Activity" value={planObj.activityId} onChange={(e) => setplanObj({ ...planObj, activityId: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>
                <Grid item xs={3}><TextField select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                <Grid item xs={3}><TextField type='number' label="BFIL" value={planObj.finBfil} onChange={(e) => setplanObj({ ...planObj, finBfil: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other Gov Schemes" value={planObj.finGov} onChange={(e) => setplanObj({ ...planObj, finGov: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Other" value={planObj.finOther} onChange={(e) => setplanObj({ ...planObj, finOther: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="MGNREGA" value={planObj.finMgn} onChange={(e) => setplanObj({ ...planObj, finMgn: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="IBL" value={planObj.finIbl} onChange={(e) => setplanObj({ ...planObj, finIbl: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>
                <Grid item xs={3}><TextField type='number' label="Community" value={planObj.finCom} onChange={(e) => setplanObj({ ...planObj, finCom: e.target.value })} /></Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField label="Total" value={planObj.wfsValue} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }} disabled={loading}>Cancel</Button>
                <Button onClick={() => { PlanEdit(planObj.planningId) }} disabled={loading}>Update</Button>
            </DialogActions>
        </Dialog>
    </>)
}