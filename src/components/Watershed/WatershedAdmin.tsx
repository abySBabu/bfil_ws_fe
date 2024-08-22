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
    const tHeads: string[] = ['Watershed', 'Description', 'Location'];

    return (<Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}><TableContainer><Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setSelected(true)}>
                    <TableCell>Ganga</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>District, Taluk, Panchayat</TableCell>
                </TableRow>
            </TableBody>

            <TableFooter><TableRow>
                <TablePagination
                    count={1}
                    rowsPerPage={rPP}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={({ count, page }) => `Page ${page + 1} of ${Math.ceil(count / rPP)}`}
                />
            </TableRow></TableFooter>
        </Table></TableContainer></Paper>

        <Dialog open={selected} onClose={() => setSelected(false)}>
            <DialogTitle>Survey no - Intervention</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField disabled label='Watershed' value="Ganga" /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12}><TextField disabled label='Description' value="Description" /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12}><TextField disabled label="Location" value="District, Taluk, Panchayat, Watershed, Village, Survey number" /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setSelected(false)}>Close</Button>
                <Button>Edit</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}