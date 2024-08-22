import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    Paper, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider
} from "@mui/material";
import { sd } from '../../common';

export const TasksAdmin: React.FC = () => {
    const [selected, setSelected] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rPP = 10;
    const tHeads: string[] = ['Watershed Location', 'Farmer', 'Intervention', 'Land Type', 'Total Units', 'Water Conserved', 'Funds Spent', 'Funds Source'];

    return (<Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}><TableContainer><Table>
            <TableHead>
                <TableRow sx={{ bgcolor: sd('--button-bgcolor-hover-brand') }}>
                    {tHeads.map((t, i) => (<TableCell key={i}>{t}</TableCell>))}
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow onClick={() => setSelected(true)}>
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
                    labelDisplayedRows={({ count, page }) => `Page ${page + 1} of ${Math.ceil(count / rPP)}`}
                />
            </TableRow></TableFooter>
        </Table></TableContainer></Paper>

        <Dialog open={selected} onClose={() => setSelected(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={6}><TextField disabled label='Intervention Side' value="Supply" /></Grid>
                <Grid item xs={6}><TextField disabled label='Intervention Type (Task)' value="Earthen bunding" /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12}><TextField disabled label='Watershed Location' value="District, Taluk, Panchayat, Watershed, Village, Survey number" /></Grid>
                <Grid item xs={4}><TextField disabled label='Farmer' value="Name, Aadhar, Mobile" /></Grid>
                <Grid item xs={4}><TextField disabled label='Land Type' value="Wet land" /></Grid>
                <Grid item xs={4}><TextField disabled label='Total Units' value="200 sqft" /></Grid>
                <Grid item xs={4}><TextField disabled label="Water Conserved" value="40000 litres" /></Grid>
                <Grid item xs={4}><TextField disabled label="Funds spent" value="2,00,000" /></Grid>
                <Grid item xs={4}><TextField disabled label="Funds source" value="BFIL" /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12}><TextField disabled label="Image" value="Image with geo-tag" multiline rows={4} /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setSelected(false)}>Close</Button>
                <Button>Edit</Button>
            </DialogActions>
        </Dialog>
    </Box>)
}