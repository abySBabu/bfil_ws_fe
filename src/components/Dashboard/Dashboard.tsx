import React from 'react';
import { Box, Card, CardHeader, CardContent, CardMedia, Typography, Grid, Modal, IconButton } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Square, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { sd } from '../../common';

const actCard = { height: '80px', borderRadius: sd('--card-bradius'), color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor') }

const ActivityCard: React.FC<{ name: string, value: string }> = ({ name, value }) => (<Grid item xs={6} md={2}><Card sx={actCard}><CardContent sx={{ textAlign: 'center' }}>
    <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>{name}</Typography>
    <Typography variant='body2'>{value}</Typography>
</CardContent></Card></Grid>)

export const Dashboard: React.FC = () => {
    const [gMod, setgMod] = React.useState<string | null>(null);
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    const icos = [Square, Water, Agriculture, CurrencyRupee]
    const data = ['4000 sqft', '20000 litres', '45 farmers', '₹ 40,00,000']
    const iclr = ['#96c22f', '#3b77b9', '#f58e1d', '#bfab55']

    return (<>
        <Grid container spacing={1}>
            <Grid item xs={12}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>Key Impact Indicators</Typography></Grid>
            {keys.map((k, i) => (<Grid item xs={12} md={3} key={i}><Card sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '120px',
                position: 'relative', color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor'), p: '12px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '125%' }}>{k}</Typography>
                    <CardMedia component={icos[i]} sx={{ fontSize: '250%', color: iclr[i] }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'><b>{data[i]}</b></Typography>
                    <IconButton onClick={() => setgMod(k)}><BarChartIcon /></IconButton>
                </Box>
            </Card></Grid>))}
            <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>Supply Side Interventions</Typography></Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Bunding</Typography>
                        <Typography variant='body2'>2000 cubic metres</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Waste weirs</Typography>
                        <Typography variant='body2'>36 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Pebble/Boulder bund</Typography>
                        <Typography variant='body2'>350 cubic metres</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Farm Ponds</Typography>
                        <Typography variant='body2'>7 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Check dams</Typography>
                        <Typography variant='body2'>12 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Nala treatment</Typography>
                        <Typography variant='body2'>4000 cubic metres</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Kalyani renovation</Typography>
                        <Typography variant='body2'>9 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Afforestation</Typography>
                        <Typography variant='body2'>234 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Open Well Renovation</Typography>
                        <Typography variant='body2'>16 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Recharge Structures</Typography>
                        <Typography variant='body2'>9 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>Demand Side Interventions</Typography></Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Drip/Sprinkler</Typography>
                        <Typography variant='body2'>200 hectares</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Soil health cards</Typography>
                        <Typography variant='body2'>60 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Members capacitated</Typography>
                        <Typography variant='body2'>20 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={actCard}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Sustainable practices</Typography>
                        <Typography variant='body2'>43 #</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <Modal open={Boolean(gMod)} onClose={() => setgMod(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <Card sx={{ outline: 'none' }}>
                <CardHeader title={gMod} sx={{ color: '#fff', bgcolor: sd('--text-color-special') }} />

                <CardContent sx={{ gap: '8px', p: 1 }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                        height={200}
                        width={600}
                    />
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Bunding' },
                                    { id: 1, value: 15, label: 'Nala Treatment' },
                                    { id: 2, value: 20, label: 'Check Dam' },
                                ]
                            }
                        ]}
                        height={200}
                        width={600}
                    />
                </CardContent>
            </Card>
        </Modal>
    </>)
}