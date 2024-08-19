import React from "react";
import { Card, CardHeader, CardContent, CardActions, Modal, Button, Grid, TextField, MenuItem } from "@mui/material";


export const CrpModal: React.FC<{ mdl: boolean }> = ({ mdl }) => {
    return (<Modal open={mdl}><Card>
        <CardHeader title="Add a new Supply Side Intervention" />

        <CardContent sx={{ my: 2 }}><Grid container spacing={2}>
            <Grid item xs={12}><TextField select label='Intervention side' sx={{ width: '40%' }}>
                <MenuItem value='supply'>Supply</MenuItem>
                <MenuItem value='demand'>Demand</MenuItem>
            </TextField></Grid>
            <Grid item xs={4}><TextField label='Type' /></Grid>
            <Grid item xs={4}><TextField label='District' /></Grid>
            <Grid item xs={4}><TextField label='Taluk' /></Grid>
            <Grid item xs={4}><TextField label='Watershed' /></Grid>
            <Grid item xs={4}><TextField label='Village' /></Grid>
        </Grid></CardContent>

        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '4px' }}>
            <Button>Cancel</Button>
            <Button>Add</Button>
        </CardActions>
    </Card></Modal>)
}