import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider,
    Typography, Card, MenuItem
} from "@mui/material";
import { sd, TPA } from '../../common';

const actObj = {
    ws_name: "WS1",
    intervention: "supply",
    activity: "Earthen bunding",
    villages: [],
    surveys: [],
    farmer_aadhar: "",
    units: "",
    land_type: "",
    wtr_saved: "",
    funds_spd: "",
    funds_src: ""
}

export const WsActivity: React.FC = () => {
    const [selected, setselected] = React.useState(false);
    const [drip, setdrip] = React.useState(false);
    const [edt, setedt] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['Watershed', 'Intervention', 'Activity', 'Total Units'];

    return (<Box sx={{ width: '100%' }}>
        <Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setselected(true)}>
                    <TableCell>Watershed 1</TableCell>
                    <TableCell>Supply</TableCell>
                    <TableCell>Earthen bunding</TableCell>
                    <TableCell>200 sqft</TableCell>
                </TableRow>
                <TableRow onClick={() => { setselected(true); setdrip(true); }}>
                    <TableCell>Watershed 2</TableCell>
                    <TableCell>Demand</TableCell>
                    <TableCell>Drip/Sprinkler</TableCell>
                    <TableCell>200 sqft</TableCell>
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
        </Table>

        <Dialog open={selected}>
            <DialogTitle>Activity Name</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField disabled label='Intervention Type' value="Supply" /></Grid>
                <Grid item xs={3}><TextField disabled label='Activity' value="Earthen bunding" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Watershed' value="WS1" /></Grid>
                <Grid item xs={3}><TextField disabled label='State' value="Karnataka" /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value="District" /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value="Taluk" /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value="Panchayat" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Villages' value="Value" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Survey Numbers' value="Value" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Activity Details</Divider></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Total Units' value="200 sqft" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Land Type' value="Wet land">
                    <MenuItem value='Wet land'>Wet land</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label="Water Conserved (litres)" value="40000" /></Grid>
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

                <Grid item xs={12}><Divider component={Typography} textAlign='left'></Divider></Grid>
                <Grid item xs={2}><Card sx={{
                    height: '100px', width: '100px', p: 1,
                    border: '1px solid black', display: 'flex',
                    flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                    <Typography>Img 1</Typography>
                </Card></Grid>
                <Grid item xs={2}><Card sx={{
                    height: '100px', width: '100px', p: 1,
                    border: '1px solid black', display: 'flex',
                    flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                    <Typography>Img 2</Typography>
                </Card></Grid>
                <Grid item xs={2}><Card sx={{
                    height: '100px', width: '100px', p: 1,
                    border: '1px solid black', display: 'flex',
                    flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                    <Typography>Img 3</Typography>
                </Card></Grid>
            </Grid></DialogContent>

            <DialogActions>{
                edt ? <>
                    <Button onClick={() => setedt(false)}>Discard</Button>
                    <Button onClick={() => setedt(false)}>Save</Button>
                </> : <>
                    <Button onClick={() => setselected(false)}>Close</Button>
                    <Button onClick={() => setedt(true)}>Edit</Button>
                </>
            }</DialogActions>
        </Dialog>
    </Box>)
}