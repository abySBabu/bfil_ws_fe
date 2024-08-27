import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { CropSquare, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import { sd } from '../../common';

const actCard = { height: '80px', borderRadius: sd('--card-bradius'), color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor') }

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    const icos = [CropSquare, Water, Agriculture, CurrencyRupee]
    const data = ['4000 sqft', '20000 litres', '45 farmers', '₹ 40,00,000']

    return (<Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            {keys.map((k, i) => (
                <Card sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '160px', width: '25%',
                    borderRadius: sd('--card-bradius'), color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor')
                }}>
                    <CardContent>
                        <Typography variant='h5' sx={{ mb: 1 }}>{k}</Typography>
                        <Typography>{data[i]}</Typography>
                    </CardContent>
                    <CardMedia component={icos[i]} sx={{ fontSize: '250%', mt: '12px', mr: '12px' }} />
                </Card>
            ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <Card sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                height: '240px', width: '50%', borderRadius: '15px'
            }}>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                />
            </Card>

            <Card sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                height: '240px', width: '50%', borderRadius: '15px'
            }}>
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
                />
            </Card>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid container spacing={2} sx={{ width: '50%' }}>
                <Grid item xs={12}><Typography variant='h5' fontWeight='bold'>Supply Side</Typography></Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Bunding</Typography>
                            <Typography variant='body2'>2000 cubic metres</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Pebble Bund</Typography>
                            <Typography variant='body2'>350 cubic metres</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Activity</Typography>
                            <Typography variant='body2'>Act Data</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Farm Ponds</Typography>
                            <Typography variant='body2'>7</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ width: '50%' }}>
                <Grid item xs={12}><Typography variant='h5' fontWeight='bold'>Demand Side</Typography></Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Drip/Sprinkler</Typography>
                            <Typography variant='body2'>200 hectares</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Soil health cards</Typography>
                            <Typography variant='body2'>60</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Members capacitated</Typography>
                            <Typography variant='body2'>20</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={actCard}>
                        <CardContent>
                            <Typography variant='h6'>Sustainable</Typography>
                            <Typography variant='body2'>43</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    </Box>)
}