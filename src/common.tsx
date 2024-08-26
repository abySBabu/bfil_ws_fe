import { createTheme } from '@mui/material/styles';
import { Box, IconButton, useTheme, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { darken } from '@mui/material/styles';

export const setTimeoutsecs = 1000;
export const setAutoHideDurationTimeoutsecs = 3000;
export const serverPath = { authserver: "http://172.104.56.206:9077/auth/", bfil: "http://192.168.1.42:8080/bfil/" }
export const sd = (css: string) => getComputedStyle(document.documentElement).getPropertyValue(css).trim()

export const btnSx = {
    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
    '&:hover': { color: sd('--text-color-hover'), backgroundColor: sd('--button-bgcolor-hover-brand') },
    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
}

export const TPA = (props: any) => {
    const theme = useTheme();
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
        </Box>
    );
}

export const appTheme = createTheme({
    typography: { fontFamily: sd('--text-font') },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
                    '&:hover': { color: sd('--text-color-hover'), backgroundColor: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    position: 'fixed', bottom: sd('--button-corner'), right: sd('--button-corner'),
                    color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
                    '&:hover': { color: sd('--text-color-hover'), backgroundColor: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-head') },
                    '& .MuiTableCell-root': { color: sd('--text-color-default'), textTransform: 'none' }
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': { color: sd('--text-color-hover'), textTransform: 'none' },
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-body-default'), cursor: 'pointer' },
                    '& .MuiTableRow-root:hover': { backgroundColor: sd('--table-bgcolor-body-hover') },
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backdropFilter: sd('--modal-backdrop')
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: sd('--modal-padding')
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: sd('--modal-padding')
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: sd('--modal-padding')
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { border: sd('--textfield-border-sel') },
                        '&.Mui-disabled fieldset': { border: sd('--textfield-border-dis'), },
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': { color: sd('--textfield-label-sel') },
                        '&.Mui-disabled': { color: sd('--textfield-label-dis') }
                    }
                }
            },
            defaultProps: {
                fullWidth: true
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    color: sd('--alert-text-color'), fontSize: sd('--alert-text-size'),
                    backgroundColor: sd('--alert-bgcolor-brand'), borderRadius: sd('--alert-bradius'),
                    padding: sd('--alert-padding'), position: 'absolute', top: sd('--alert-position-top'),
                    left: sd('--alert-position-left'), transform: sd('--alert-position-transform'),
                    zIndex: sd('--alert-zindex')
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: sd('--text-color-special'),
                    cursor: sd('--text-styles-pointer'),
                    '&:hover': { color: sd('--text-color-hover') }
                }
            },
            defaultProps: { underline: 'hover' }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: darken('rgba(0, 0, 0, 1)', 0.8),
                        '&:hover': { backgroundColor: darken('rgba(0, 0, 0, 1)', 1) }
                    }
                }
            }
        }
    }
})