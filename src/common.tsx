import { createTheme } from '@mui/material/styles';
import { Box, IconButton, useTheme, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export const serverPath = { authserver: "http://172.104.56.206:9077/auth/" }

export const sd = (css: string) => (getComputedStyle(document.documentElement).getPropertyValue(css).trim());

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
        MuiTableHead: {
            styleOverrides: {
                root: {
                    position: 'sticky', top: 0, zIndex: 100, backgroundColor: sd('--button-bgcolor-active-brand'),
                    '& .MuiTableCell-root': { color: sd('--text-color-default'), textTransform: 'none' }
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': { color: sd('--text-color-hover'), textTransform: 'none' },
                    '& .MuiTableRow-root:hover': { backgroundColor: '#f0f5f5' },
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
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: sd('--box-padding'), borderRadius: sd('--box-bradius'),
                    backgroundColor: sd('--box-bgcolor-default')
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
                        '&.Mui-disabled': { color: '--textfield-label-dis' }
                    }
                }
            },
            defaultProps: {
                fullWidth: true
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
        }
    }
})