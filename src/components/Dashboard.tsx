import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField, Card, Typography } from "@mui/material";


export default function Dashboard() {
    return (<Box sx={{ height: '90vh' }}>
        {/* <Dialog open={true}>
            <DialogTitle>Add a new Supply Side Intervention</DialogTitle>

            <DialogContent sx={{ my: 1 }}><Grid container spacing={2}>
                <Grid item xs={4}><TextField label='Type' /></Grid>
                <Grid item xs={4}><TextField label='District' /></Grid>
                <Grid item xs={4}><TextField label='Taluk' /></Grid>
                <Grid item xs={4}><TextField label='Watershed' /></Grid>
                <Grid item xs={4}><TextField label='Village' /></Grid>
            </Grid></DialogContent>

            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '4px' }}>
                <Button>Cancel</Button>
                <Button>Add</Button>
            </DialogActions>
        </Dialog> */}

        <Grid container sx={{ display: 'flex' }}>
            <Grid item xs={8}>
                <Card sx={{ height: '90vh', bgcolor: 'pink', alignContent: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }}>Details</Typography>
                </Card>
            </Grid>

            <Grid item xs={4}>
                <Card sx={{ height: '90vh', bgcolor: 'yellowgreen', alignContent: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }}>Map</Typography>
                </Card>
            </Grid>
        </Grid>
    </Box>)
}