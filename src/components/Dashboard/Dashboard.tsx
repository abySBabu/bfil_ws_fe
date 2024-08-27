import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { CropSquare, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import { sd } from '../../common';

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    const icos = [CropSquare, Water, Agriculture, CurrencyRupee]
    const data = ['4000 sqft', '20000 litres', '45 farmers', '₹ 40,00,000']

    return (<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {keys.map((k, i) => (
                <Card raised sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '160px', width: '25%',
                    borderRadius: sd('--card-bradius'), color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor')
                }}>
                    <CardContent>
                        <Typography variant='h6' sx={{ mb: 1 }}>{k}</Typography>
                        <Typography variant='body2'>{data[i]}</Typography>
                    </CardContent>
                    <CardMedia component={icos[i]} sx={{ fontSize: '1000%' }} />
                </Card>
            ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <Card raised sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                height: '240px', width: '50%', borderRadius: '15px'
            }}>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                />
            </Card>

            <Card raised sx={{
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

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <Card raised sx={{
                display: 'flex', height: '200px', width: '50%', borderRadius: sd('--card-bradius'),
                color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor')
            }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 1 }}>Supply Side Interventions</Typography>
                    <Typography variant='body2'>13 Interventions</Typography>
                </CardContent>
            </Card>

            <Card raised sx={{
                display: 'flex', height: '200px', width: '50%', borderRadius: sd('--card-bradius'),
                color: sd('--card-txtcolor'), bgcolor: sd('--card-bgcolor')
            }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 1 }}>Demand Side Interventions</Typography>
                    <Typography variant='body2'>4 Interventions</Typography>
                </CardContent>
            </Card>
        </Box>
    </Box>)
}