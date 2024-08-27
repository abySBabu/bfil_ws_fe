import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { CropSquare, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    const icos = [CropSquare, Water, Agriculture, CurrencyRupee]
    const data = ['4000 sqft', '20000 litres', '45 farmers', '₹ 40,00,000']

    return (<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {keys.map((k, i) => (
                <Card raised sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    height: '160px', width: '24%', borderRadius: '15px', color: 'maroon'
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
                height: '240px', width: '49%', borderRadius: '15px'
            }}>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                />
            </Card>
        </Box>
    </Box>)
}
