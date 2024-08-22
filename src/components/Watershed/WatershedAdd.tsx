import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Fab } from "@mui/material";
import { Add } from '@mui/icons-material';
import { addWS } from '../../Services/wsService';

const wsObj = {
    ws_name: "",
    ws_description: "",
    name_of_the_state: "Karnataka",
    name_of_the_district: "",
    name_of_the_taluka: "",
    name_of_the_grampanchayat: "",
    name_of_the_village: "",
    map_link: ""
}

export const WatershedAdd: React.FC = () => {
    const [addM, setaddM] = React.useState(false);
    const [addObj, setaddObj] = React.useState(wsObj);

    const stateCh = (e: any) => {
        setaddObj({
            ...addObj,
            name_of_the_state: e.target.value,
            name_of_the_district: "",
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const districtCh = (e: any) => {
        setaddObj({
            ...addObj,
            name_of_the_district: e.target.value,
            name_of_the_taluka: "",
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const talukCh = (e: any) => {
        setaddObj({
            ...addObj,
            name_of_the_taluka: e.target.value,
            name_of_the_grampanchayat: "",
            name_of_the_village: ""
        })
    }

    const panchayatCh = (e: any) => {
        setaddObj({
            ...addObj,
            name_of_the_grampanchayat: e.target.value,
            name_of_the_village: ""
        })
    }

    const WSadd = async () => {
        try {
            const resp = await addWS(addObj)
            if (resp) { console.log('Add success') }
        }
        catch (error) { console.log(error) }
    }

    return (<>
        <Fab onClick={() => setaddM(true)}><Add /></Fab>

        <Dialog open={addM} onClose={() => setaddM(false)}>
            <DialogTitle>Survey 57. Earthen bunding</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}><TextField label='Watershed' value={addObj.ws_name} onChange={(e) => setaddObj({ ...addObj, ws_name: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField label='Description' value={addObj.ws_description} onChange={(e) => setaddObj({ ...addObj, ws_description: e.target.value })} /></Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={4}><TextField label='State' value={addObj.name_of_the_state} onChange={(e) => stateCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='District' value={addObj.name_of_the_district} onChange={(e) => districtCh(e)} /></Grid>
                <Grid item xs={4}><TextField label='Taluka' value={addObj.name_of_the_taluka} onChange={(e) => talukCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Grampanchayat" value={addObj.name_of_the_grampanchayat} onChange={(e) => panchayatCh(e)} /></Grid>
                <Grid item xs={4}><TextField label="Village" value={addObj.name_of_the_village} onChange={(e) => setaddObj({ ...addObj, name_of_the_village: e.target.value })} /></Grid>
                <Grid item xs={4} />
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => setaddM(false)}>Close</Button>
                <Button onClick={WSadd}>Add</Button>
            </DialogActions>
        </Dialog>
    </>)
}