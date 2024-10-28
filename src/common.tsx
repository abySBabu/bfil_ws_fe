import React from 'react';
import { Box, IconButton, Typography, ThemeProvider, Snackbar, Alert } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { tpaTheme } from './theme';

export const setTimeoutsecs = 3000;
export const setAutoHideDurationTimeoutsecs = 3000;
//Server
// export const serverPath = { authserver: "https://auth1.abynet.xyz/auth/", bfil: "https://bfilbe.abynet.xyz/bfil/", workFlow: "https://workflow1.abynet.xyz/wf/",companyID:"151" }
//Testport

export const serverPath = { authserver: "http://localhost:8086/auth/", bfil: "http://localhost:8080/bfil/", workFlow: "http://localhost:8083/wf/", companyID: "137"  }

// export const serverPath = { authserver: "https://auth1.abynet.xyz/auth/", bfil: "https://bfilbedev.abynet.xyz/bfil/", workFlow: "https://workflow1.abynet.xyz/wf/", companyID: "137" }
export const sd = (css: string) => getComputedStyle(document.documentElement).getPropertyValue(css).trim()
export const PerChk = (per: string): boolean => {
    const permList = sessionStorage.getItem('permList');
    const parsedPermList = permList ? JSON.parse(permList) : ['Null'];

    return parsedPermList.map((p: string) => p.trim()).includes(per);
};

export const btnSx = {
    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
    '&:hover': { color: sd('--text-color-hover'), backgroundColor: sd('--button-bgcolor-hover-brand') },
    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
}

export const pBtn = { backgroundColor: 'var(--button-bgcolor-active-positive)', '&:hover': { backgroundColor: 'var(--button-bgcolor-hover-positive)' } }

export const nBtn = { backgroundColor: 'var(--button-bgcolor-active-negative)', '&:hover': { backgroundColor: 'var(--button-bgcolor-hover-negative)' } }

export const TPA = (props: any) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (<ThemeProvider theme={tpaTheme}>
        <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <Typography sx={{ mx: '4px' }}>
                {page + 1} / {Math.ceil(count / rowsPerPage)}
            </Typography>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    </ThemeProvider>);
}

export const SnackAlert: React.FC<{ alert: string | null; setalert: () => void; success: boolean; }> = ({ alert, setalert, success }) =>
(<Snackbar open={Boolean(alert)} onClose={setalert} autoHideDuration={5000}>
    <Alert severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
        {alert}
    </Alert>
</Snackbar>)