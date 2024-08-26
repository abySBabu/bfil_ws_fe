import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export const Dashboard: React.FC = () => {
    const keys = ['Watershed Area Treated', 'Water Conserved', 'Farmers Impacted', 'Goverment Amount Leveraged']
    return (<Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        {keys.map((k) => (<Card sx={{ display: 'flex', height: '20%', width: '24%', bgcolor: 'gray' }} raised>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <CardContent>
                    <Typography variant='h6'>{k}</Typography>
                    <Typography variant='body2'>Data</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
            </Box>
        </Card>))}
    </Box>)
}
