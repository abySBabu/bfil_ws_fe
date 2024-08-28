import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Modal } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { CropSquare, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { sd } from '../../common';

const actCard = { height: '80px', borderRadius: sd('--card-bradius'), color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor') }

export const Dashboard: React.FC = () => {
    const [gMod, setgMod] = React.useState(false);
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    const icos = [CropSquare, Water, Agriculture, CurrencyRupee]
    const data = ['4000 sqft', '20000 litres', '45 farmers', '₹ 40,00,000']
    const iclr = ['#96c22f', '#3b77b9', '#f58e1d', '#c9c9c9']

    return (<>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                {keys.map((k, i) => (
                    <Card sx={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '160px', width: '25%',
                        /* borderRadius: sd('--card-bradius'), */ color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor')
                    }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '125%' }}>{k}</Typography>
                            <Typography variant='h4'><b>{data[i]}</b></Typography>
                            <BarChartIcon onClick={() => setgMod(!gMod)} sx={{ cursor: 'pointer' }} />
                        </CardContent>
                        <CardMedia component={icos[i]} sx={{ fontSize: '250%', mt: '12px', mr: '12px', color: iclr[i] }} />
                    </Card>
                ))}
            </Box>

            <Grid container spacing={1}>
                <Grid item xs={12}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1 }}>Supply Side</Typography></Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Bunding</Typography>
                            <Typography variant='body2'>2000 cubic metres</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Waste weirs</Typography>
                            <Typography variant='body2'>36</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Pebble/Boulder bund</Typography>
                            <Typography variant='body2'>350 cubic metres</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Farm Ponds</Typography>
                            <Typography variant='body2'>7</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Check dams</Typography>
                            <Typography variant='body2'>12</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Nala treatment</Typography>
                            <Typography variant='body2'>4000 cubic metres</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Kalyani renovation</Typography>
                            <Typography variant='body2'>9</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Afforestation</Typography>
                            <Typography variant='body2'>234</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Open Well Renovation</Typography>
                            <Typography variant='body2'>16</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Recharge Structures</Typography>
                            <Typography variant='body2'>9</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Other</Typography>
                            <Typography variant='body2'>#</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={12}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1 }}>Demand Side</Typography></Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Drip/Sprinkler</Typography>
                            <Typography variant='body2'>200 hectares</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Soil health cards</Typography>
                            <Typography variant='body2'>60</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Members capacitated</Typography>
                            <Typography variant='body2'>20</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='body1' fontWeight='bold' sx={{ mb: 1 }}>Sustainable</Typography>
                            <Typography variant='body2'>43</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>

        <Modal open={gMod} onClose={() => setgMod(false)} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
        }}>
            <Card sx={{ outline: 'none', gap: '8px', p: 1 }}>
                <Typography variant='h6'>Key impact indicator</Typography>
                {/* <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                    height={200}
                    width={600}
                /> */}
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
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
            </Card>
        </Modal>
    </>)
}