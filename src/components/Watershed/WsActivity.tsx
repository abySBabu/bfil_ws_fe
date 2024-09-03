import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider,
    Typography
} from "@mui/material";
import { sd, TPA } from '../../common';

export const WsActivity: React.FC = () => {
    const [selected, setselected] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['Watershed Location', 'Farmer', 'Intervention', 'Land Type', 'Total Units', 'Water Conserved', 'Funds Spent', 'Funds Source'];

    return (<Box sx={{ width: '100%' }}>
        <Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setselected(true)}>
                    <TableCell>District, Taluk, Panchayat, Watershed, Village, Survey number</TableCell>
                    <TableCell>
                        Name
                        Aadhar
                        Mobile
                    </TableCell>
                    <TableCell>Earthen bunding</TableCell>
                    <TableCell>Wet land</TableCell>
                    <TableCell>200 sqft</TableCell>
                    <TableCell>40000 litres</TableCell>
                    <TableCell>2,00,000</TableCell>
                    <TableCell>BFIL</TableCell>
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

        <Dialog open={selected} onClose={() => setselected(false)}>
            <DialogTitle>Activity Name</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Intervention Details</Divider></Grid>
                <Grid item xs={6}><TextField disabled label='Intervention Side' value="Supply" /></Grid>
                <Grid item xs={6}><TextField disabled label='Intervention Type (Task)' value="Earthen bunding" /></Grid>
                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Watershed Details</Divider></Grid>
                <Grid item xs={4}><TextField disabled label='State' value="Karnataka" /></Grid>
                <Grid item xs={4}><TextField disabled label='District' value="Value" /></Grid>
                <Grid item xs={4}><TextField disabled label='Taluk' value="Value" /></Grid>
                <Grid item xs={4}><TextField disabled label='Panchayat' value="Value" /></Grid>
                <Grid item xs={4}><TextField disabled label='Watershed' value="Value" /></Grid>
                <Grid item xs={4}><TextField disabled label='Village' value="Value" /></Grid>
                <Grid item xs={4}><TextField disabled label='Survey No.' value="Value" /></Grid>
                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Farmer Details</Divider></Grid>
                <Grid item xs={4}><TextField disabled label='Name' value="Name" /></Grid>
                <Grid item xs={4}><TextField disabled label='Aadhar' value="0000 1111 2222" /></Grid>
                <Grid item xs={4}><TextField disabled label='Mobile No.' value="0123456789" /></Grid>
                <Grid item xs={12}><Divider component={Typography} textAlign='left'>Activity Details</Divider></Grid>
                <Grid item xs={4}><TextField disabled label='Land Type' value="Wet land" /></Grid>
                <Grid item xs={4}><TextField disabled label='Total Units' value="200 sqft" /></Grid>
                <Grid item xs={4}><TextField disabled label="Water Conserved" value="40000 litres" /></Grid>
                <Grid item xs={4}><TextField disabled label="Funds spent" value="2,00,000" /></Grid>
                <Grid item xs={4}><TextField disabled label="Funds source" value="BFIL" /></Grid>
                <Grid item xs={4}><TextField disabled label="Image" value="Image with geo-tag" /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setselected(false)}>Close</Button>
                <Button>Edit</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}