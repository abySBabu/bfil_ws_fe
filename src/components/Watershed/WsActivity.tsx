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
    const [selected, setselected] = React.useState(0);
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
                <TableRow onClick={() => setselected(1)}>
                    <TableCell>Watershed 1</TableCell>
                    <TableCell>Supply</TableCell>
                    <TableCell>Earthen bunding</TableCell>
                    <TableCell>200 sqft</TableCell>
                </TableRow>
                <TableRow onClick={() => { setselected(2); }}>
                    <TableCell>Watershed 2</TableCell>
                    <TableCell>Demand</TableCell>
                    <TableCell>Drip/Sprinkler</TableCell>
                    <TableCell>200 sqft</TableCell>
                </TableRow>
                <TableRow onClick={() => { setselected(3); }}>
                    <TableCell>Watershed 1</TableCell>
                    <TableCell>Demand</TableCell>
                    <TableCell>Members Capacitated</TableCell>
                    <TableCell>7</TableCell>
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

        <Dialog open={Boolean(selected)}>
            <DialogTitle>{
                selected === 1 ?
                    "Earthen bunding"
                    : selected === 2 ?
                        "Sustainable Agriculture"
                        :
                        "Members capacitated"
            }</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>{selected === 3 ? <>

                <Grid item xs={3}><TextField disabled label='Event Name' value="Watershed 1" /></Grid>
                <Grid item xs={3}><TextField select disabled={!edt} label='Event Type' value="Camp">
                    <MenuItem value='Group discussion'>Group discussion</MenuItem>
                    <MenuItem value='Training'>Training</MenuItem>
                    <MenuItem value='Camp'>Camp</MenuItem>
                </TextField></Grid>
                <Grid item xs={3}><TextField disabled label='Event Date' value="04.10.2024" /></Grid>
                <Grid item xs={3}><TextField disabled label='Target Group' value="Farmers" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'></Divider></Grid>
                <Grid item xs={3}><TextField disabled label='Habitations' value="Village A, Village C" /></Grid>
                <Grid item xs={3}><TextField disabled label='Panchayat' value="Panchayat" /></Grid>
                <Grid item xs={3}><TextField disabled label='Taluk' value="Taluk" /></Grid>
                <Grid item xs={3}><TextField disabled label='District' value="District" /></Grid>
                <Grid item xs={3}><TextField disabled label='State' value="Karnataka" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'></Divider></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Total Participants' value="27" /></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Male Participants' value="16" /></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Female Participants' value="11" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'></Divider></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Facilitator' value="Prabhakar" /></Grid>
                <Grid item xs={3}><TextField disabled={!edt} label='Mobilizer' value="Nagraj" /></Grid>
                <Grid item xs={6}><TextField disabled={!edt} label='Remarks' value="Remarks" /></Grid>

                <Grid item xs={12}><Divider component={Typography} textAlign='left'></Divider></Grid>
                <Grid item xs={2}><Card sx={{
                    height: '100px', width: '100px', p: 1,
                    border: '1px solid black', display: 'flex',
                    flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                    <Typography>Img Event</Typography>
                </Card></Grid>
                <Grid item xs={2}><Card sx={{
                    height: '100px', width: '100px', p: 1,
                    border: '1px solid black', display: 'flex',
                    flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                    <Typography>Img Attendance</Typography>
                </Card></Grid>
            </> : <>
                <Grid item xs={3}><TextField disabled label='Intervention Type' value={selected === 1 ? "Supply" : "Demand"} /></Grid>
                <Grid item xs={3}><TextField disabled label='Activity' value={selected === 1 ? "Earthen bunding" : selected === 2 ? "Sustainable Agriculture Practice" : "Members Capacitated"} /></Grid>
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
                        <MenuItem value='Wet land'>Wet land</MenuItem>
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
            </>}</Grid></DialogContent>

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
    </Box>)
}