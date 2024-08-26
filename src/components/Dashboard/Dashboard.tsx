import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Government Amount Leveraged']
    return (<Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        {keys.map((k) => (<Card sx={{ display: 'flex', height: '160px', width: '24%' }} raised>
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
    </Box>)
}
