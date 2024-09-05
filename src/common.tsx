import { Box, IconButton, Typography, Select, MenuItem, useTheme } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export const setTimeoutsecs = 1000;
export const setAutoHideDurationTimeoutsecs = 3000;
export const serverPath = { authserver: "http://172.104.56.206:9077/auth/", bfil: "https://bfilbe.abynet.xyz/bfil/" }
export const sd = (css: string) => getComputedStyle(document.documentElement).getPropertyValue(css).trim()
export const tkn = { Authorization: `Bearer ${sessionStorage.getItem("token")}` }

export const btnSx = {
    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
    '&:hover': { color: sd('--text-color-hover'), backgroundColor: sd('--button-bgcolor-hover-brand') },
    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
}

export const TPA = (props: any) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange, onRowsPerPageChange } = props;

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

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <Typography sx={{ mx: '4px' }}>
                {page + 1} / {Math.ceil(count / rowsPerPage)}
            </Typography>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
            <Select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                sx={{ ml: 2, minWidth: '80px', color: '#fff' }}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
            </Select>
        </Box>
    );
}