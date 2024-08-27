import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    return (<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {keys.map((k) => (<Card sx={{ display: 'flex', height: '160px', width: '24%', borderRadius: '15px' }} raised>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CardContent>
                        <Typography variant='h6'>{k}</Typography>
                        <Typography variant='body2'>Data</Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 80 }}
                        image="/static/images/cards/live-from-space.jpg"
                        alt="Live from space album cover"
                    />
                </Box>
            </Card>))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <Card sx={{ display: 'flex', height: '240px', width: '49%', borderRadius: '15px' }} raised>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                />
            </Card>
        </Box>
    </Box>)
}
