import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    Paper, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider
} from "@mui/material";
import { sd } from '../../common';

export const WatershedAdmin: React.FC = () => {
    const [selected, setSelected] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['No.', 'Watershed', 'Description', 'Location'];

    return (<Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}><TableContainer><Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((i, t) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setSelected(true)}>
                    <TableCell>No</TableCell>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Location</TableCell>
                </TableRow>
            </TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={-1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={({ count, page }) => `Page ${page + 1} of ${Math.ceil(count / rPP)}`}
                />
            </TableRow></TableFooter>
        </Table></TableContainer></Paper>

        <Dialog open={selected} onClose={() => setSelected(false)}>
            <DialogTitle>Watershed name</DialogTitle>

            <DialogContent sx={{ my: 3 }}><Grid container spacing={2}>
                <Grid item xs={6}><TextField disabled label='Intervention Side' /></Grid>
                <Grid item xs={6}><TextField disabled label='Type' /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField disabled label='District' /></Grid>
                <Grid item xs={4}><TextField disabled label='Taluk' /></Grid>
                <Grid item xs={4}><TextField disabled label='Panchayat' /></Grid>
                <Grid item xs={4}><TextField disabled label='Watershed' /></Grid>
                <Grid item xs={4}><TextField disabled label='Village' /></Grid>
                <Grid item xs={4} />
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField disabled label="Farmer's name" /></Grid>
                <Grid item xs={4}><TextField disabled label="Farmer's Aadhar" /></Grid>
                <Grid item xs={4}><TextField disabled label="Farmer's number" /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setSelected(false)}>Close</Button>
                <Button>Update</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}