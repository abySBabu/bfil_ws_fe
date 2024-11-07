import React from 'react';
import { Box, Typography, Toolbar, Paper, Button, IconButton, TextField } from '@mui/material';
import { ArrowBack, Edit, Password } from '@mui/icons-material';
import { sd } from '../../common';

const profDef = {
    name: sessionStorage.getItem("userName"),
    number: sessionStorage.getItem("userNumber"),
    role: localStorage.getItem("userRole")
}

const passDef = {
    current: "",
    new: ""
}

export const MyProfile: React.FC = () => {
    const [profObj, setprofObj] = React.useState(profDef);
    const [passObj, setpassObj] = React.useState(passDef);
    const [profEdit, setprofEdit] = React.useState(false);
    const [passEdit, setpassEdit] = React.useState(false);

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
        <Toolbar sx={{ height: '6%', gap: '4px' }}>
            <IconButton href="home" sx={{ color: '#fff' }}><ArrowBack /></IconButton>
            <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>My Profile</Typography>
        </Toolbar>

        <Paper elevation={8} sx={{ height: '90%', mx: '8px', overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>{
            profEdit ? <>
                <TextField required label='Name' value={profObj.name}
                    onChange={(e) => { if (/^[a-zA-Z\s]*$/.test(e.target.value)) { setprofObj({ ...profObj, name: e.target.value }); } }}
                    helperText={profObj.name?.length === 0 && 'Name cannot be empty'} />
                <TextField required label="Number" value={profObj.number}
                    onChange={(e) => { if (/^\d*$/.test(e.target.value)) { setprofObj({ ...profObj, number: e.target.value }) } }}
                    inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }}
                    helperText={profObj.number?.length !== 10 && 'Mobile number should have 10 digits'} />
                <TextField disabled label='Role' value={profObj.role} />
                <Box>
                    <Button sx={{ mr: '4px' }} onClick={() => { setprofObj(profDef); setprofEdit(false); }}>Cancel</Button>
                    <Button sx={{ ml: '4px' }} onClick={() => setprofEdit(false)}>Save</Button>
                </Box>
            </>
                : passEdit ? <>
                    <TextField required label='Current Password' value={passObj.current} onChange={(e) => setpassObj({ ...passObj, current: e.target.value })} />
                    <TextField required label='New Password' value={passObj.new} onChange={(e) => setpassObj({ ...passObj, new: e.target.value })} />
                    <Box>
                        <Button sx={{ mr: '4px' }} onClick={() => setpassEdit(false)}>Cancel</Button>
                        <Button sx={{ ml: '4px' }} onClick={() => setpassEdit(false)}>Save</Button>
                    </Box>
                </>
                    : <>
                        <Typography variant='h6'><b>Name: </b>{profObj.name}</Typography>
                        <Typography variant='h6'><b>Number: </b>{profObj.number}</Typography>
                        <Typography variant='h6'><b>Role: </b>{profObj.role}</Typography>
                        <Box>
                            <Button startIcon={<Edit fontSize='inherit' />} sx={{ mr: '4px' }} onClick={() => setprofEdit(true)}>Edit Profile</Button>
                            <Button startIcon={<Password fontSize='inherit' />} sx={{ ml: '4px' }} onClick={() => setpassEdit(true)}>Edit Password</Button>
                        </Box>
                    </>
        }</Paper>

        <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4%' }}>
            <Typography variant='body2' sx={{ color: '#fff' }}>
                Copyright - 2024. Bharat Pragat Watershed, All Rights Reserved.
            </Typography>
        </footer>
    </Box>)
}