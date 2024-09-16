import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography,
    Card, MenuItem, IconButton, InputAdornment
} from "@mui/material";
import { AddHome, Edit, Search } from '@mui/icons-material';
import { TPA, PerChk } from '../../common';
import { listAct } from '../../Services/activityService';

const defObj = {
    ws_name: "",
    intervention: "",
    activity: "",
    villages: [],
    surveys: [],
    farmer_aadhar: "",
    units: "",
    land_type: "",
    wtr_saved: "",
    funds_spd: "",
    funds_src: ""
}

const ImgCard = (img: string) => (<Card sx={{ height: '100px', width: '100px', border: '1px solid black', }}>
    <img src={`${process.env.PUBLIC_URL}/images/${img}`} alt={`${img}`}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
</Card>)

export const WsActivity: React.FC = () => {
    const [selected, setselected] = React.useState(0);
    const [edt, setedt] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [search, setsearch] = React.useState("");
    const [actList, setactList] = React.useState<typeof defObj[]>([]);
    const [alert, setalert] = React.useState<string | null>(null);
    const [alertClr, setalertClr] = React.useState(false);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);

    React.useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const resp1 = await listAct(); if (resp1) { setactList(resp1) }
            setstOps(JSON.parse(sessionStorage.getItem("StateList") as string));
            setdsOps(JSON.parse(sessionStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
    };

    return (<>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Watershed Activity</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Watershed Activity') && (<Button startIcon={<AddHome />} onClick={() => { }} sx={{ height: '100%', ml: '4px' }}>Add Activity</Button>)}
            </div>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: '550px' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Intervention</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Total Units</TableCell>
                    {PerChk('EDIT_Watershed Activity') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setselected(1)}>
                    <TableCell>Watershed 1</TableCell>
                    <TableCell>Supply</TableCell>
                    <TableCell>Earthen bunding</TableCell>
                    <TableCell>200 sqft</TableCell>
                    {PerChk('EDIT_Watershed Activity') && <TableCell>
                        <IconButton onClick={() => { }}><Edit /></IconButton>
                    </TableCell>}
                </TableRow>
            </TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    ActionsComponent={TPA}
                />
            </TableRow></TableFooter>
        </Table></TableContainer>

        <Dialog open={Boolean(selected)} maxWidth='xl'>
            <DialogTitle>Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField disabled label='Intervention Type' value={selected === 1 ? "Supply" : "Demand"} /></Grid>
                <Grid item xs={3}><TextField disabled label='Activity' value={selected === 1 ? "Earthen bunding" : selected === 2 ? "Sustainable Agriculture Practice" : "Drip/Sprinkler"} /></Grid>
                {selected === 2 && <Grid item xs={3}><TextField disabled label='Sustainable Practice' value="Crop Rotation" /></Grid>}

                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Watershed' value={selected === 2 ? "Watershed 2" : "Watershed 1"} /></Grid>
                <Grid item xs={3}><TextField disabled label='State' value="Karnataka" /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value="District" /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value="Taluk" /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value="Panchayat" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Villages' value="Value" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Survey Numbers' value="Value" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Activity Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Total Units' value="200 sqft" /></Grid>
                {selected === 1 && <>
                    <Grid item xs={3}><TextField select disabled={!edt} label='Land Type' value="Wet land">
                        <MenuItem value='Wet land'>Public</MenuItem>
                    </TextField></Grid>

                    <Grid item xs={3}><TextField disabled={!edt} label="Water Conserved (litres)" value="40000" /></Grid>
                </>}
                <Grid item xs={3}><TextField disabled={!edt} label="Funds spent" value="2,00,000" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label="Funds source" value="BFIL">
                    <MenuItem value='BFIL'>BFIL</MenuItem>
                </TextField></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Farmer Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Name' value="Farmer" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Aadhar' value="**** **** 7251">
                    <MenuItem value='**** **** 7251'>**** **** 7251</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='Mobile No.' value="0123456789" /></Grid>

                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={2}>{ImgCard("wsact1.webp")}</Grid>
                <Grid item xs={2}>{ImgCard("wsact2.jpg")}</Grid>
                <Grid item xs={2}>{ImgCard("wsact3.jfif")}</Grid>
            </Grid></DialogContent>

            <DialogActions>{
                edt ? <>
                    <Button onClick={() => setedt(false)}>Discard</Button>
                    <Button onClick={() => setedt(false)}>Save</Button>
                </> : <>
                    <Button onClick={() => setselected(0)}>Close</Button>
                    <Button onClick={() => setedt(true)}>Edit</Button>
                </>
            }</DialogActions>
        </Dialog>
    </>)
}