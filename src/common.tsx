import { createTheme } from '@mui/material/styles';
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
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-special'), backgroundColor: '#fff', textTransform: 'none',
                    '&:hover': { /* color: sd('--text-color-hover'), */ backgroundColor: sd('--button-bgcolor-hover-brand') },
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
        MuiTableFooter: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-head') },
                    '& .MuiTableCell-root': { color: sd('--text-color-default'), textTransform: 'none' }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backdropFilter: sd('--modal-backdrop'),
                },
                paper: {
                    borderRadius: '15px'
                }
            },
            defaultProps: {
                maxWidth: 'xl',
                fullWidth: true
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: sd('--modal-padding'),
                    color: sd('--text-color-default'),
                    backgroundColor: sd('--text-color-special'),
                    borderRadius: '15px 15px 0 0'
                }
            }
        },
        // MuiDialogContent: {
        //     styleOverrides: {
        //         root: {
        //             padding: sd('--modal-padding')
        //         }
        //     }
        // },
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
                        height: '48px',
                        '& input': { height: '100%', padding: '0 12px' },
                        '&.Mui-focused fieldset': { border: sd('--textfield-border-sel') },
                        '&.Mui-disabled fieldset': { border: sd('--textfield-border-dis') }
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

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: sd('--page-nav-bgcolor-sel'),
                        '&:hover': { backgroundColor: sd('--page-nav-bgcolor-sel') }
                    }
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
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                }
            },
            defaultProps: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: sd('--text-color-link'),
                    cursor: sd('--text-styles-pointer')
                }
            },
            defaultProps: { underline: 'hover' }
        }
    }
})