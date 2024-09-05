import { createTheme } from '@mui/material/styles';
import { sd } from './common';

export const tpaTheme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    '&:hover': { color: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--button-bgcolor-active-brand') }
                }
            }
        }
    }
})

export const bfilTheme = createTheme({
    typography: { fontFamily: sd('--text-font') },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none',
                    '&:hover': { backgroundColor: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: sd('--button-bgcolor-active-brand'),
                    '&:hover': { color: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--button-bgcolor-disabled') }
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-special'), backgroundColor: '#fff', textTransform: 'none',
                    '&:hover': { backgroundColor: sd('--button-bgcolor-hover-brand') },
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
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: sd('--button-bgcolor-active-brand'),
                        '&:hover': { color: sd('--button-bgcolor-active-brand') }
                    },
                    '&:hover': { color: '#000' }
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
                    overflow: 'auto',
                    '& .MuiTableCell-root': { color: sd('--text-color-hover'), textTransform: 'none' },
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-body-default') },
                    //'& .MuiTableRow-root:hover': { backgroundColor: sd('--table-bgcolor-body-hover'), cursor: 'pointer' },
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
                maxWidth: "md",
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