import { Card, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, MenuItem, Typography } from "@mui/material";

export const CrpModal: React.FC<{ mdl: boolean }> = ({ mdl }) => {
    return (<Dialog open={mdl}>
        <DialogTitle>
            Add a new Intervention
        </DialogTitle>
        <TextField select label='Intervention Side' sx={{ width: '50%' }}>
            <MenuItem value='supply'>Supply</MenuItem>
            <MenuItem value='demand'>Demand</MenuItem>
        </TextField>

        <DialogContent sx={{ my: 2 }}><Grid container spacing={2}>
            <Grid item xs={4}><TextField select label='Type' /></Grid>
            <Grid item xs={4}><TextField select label='District' /></Grid>
            <Grid item xs={4}><TextField select label='Taluk' /></Grid>
            <Grid item xs={4}><TextField select label='Watershed' /></Grid>
            <Grid item xs={4}><TextField select label='Village' /></Grid>
            <Grid item xs={4} />
            <Grid item xs={4}><TextField label="Farmer's name" /></Grid>
            <Grid item xs={4}><TextField label="Farmer's Aadhar" /></Grid>
            <Grid item xs={4}><TextField label="Farmer's number" /></Grid>
        </Grid></DialogContent>

        <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '4px' }}>
            <Button>Cancel</Button>
            <Button>Add</Button>
        </DialogActions>
    </Dialog>)
}