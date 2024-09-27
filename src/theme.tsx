import { Fade, createTheme  } from '@mui/material';
import { sd } from './common';

export const tpaTheme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    '&:hover': { color: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: '#000', opacity: 0.25 }
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
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-default'), backgroundColor: sd('--button-bgcolor-active-brand'), textTransform: 'none', minWidth: '75px',
                    '&:hover': { backgroundColor: sd('--button-bgcolor-hover-brand') },
                    '&.Mui-disabled': { color: sd('--text-color-disabled'), backgroundColor: sd('--button-bgcolor-disabled') },
                    '&.MuiButton-outlined': {
                        borderColor: sd('--button-bgcolor-active-brand'),
                        '&:hover': { borderColor: sd('--button-bgcolor-hover-brand') },
                        '&.Mui-disabled': { borderColor: sd('--button-bgcolor-disabled') }
                    }
                }
            },
            defaultProps: {
                variant: 'outlined'
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
                    borderRadius: sd('--button-bradius'), color: sd('--text-color-special'), backgroundColor: '#fff',
                    '&:hover': { backgroundColor: sd('--button-bgcolor-hover-brand'), cursor: 'pointer' },
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
        MuiCircularProgress: {
            defaultProps: {
                size: 24,
            },
            styleOverrides: {
                root: {
                    color: 'var(--button-bgcolor-active-brand)'
                },
            },
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
                    position: 'sticky', top: 0, zIndex: 1,
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-head') },
                    '& .MuiTableCell-root': { color: sd('--text-color-default'), textTransform: 'none' }
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': { color: sd('--text-color-hover'), textTransform: 'none' },
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-body-default') },
                    //'& .MuiTableRow-root:hover': { backgroundColor: sd('--table-bgcolor-body-hover'), cursor: 'pointer' },
                }
            }
        },
        MuiTableFooter: {
            styleOverrides: {
                root: {
                    position: 'sticky', bottom: 0, zIndex: 1,
                    '& .MuiTableRow-root': { backgroundColor: sd('--table-bgcolor-head') },
                    '& .MuiTableCell-root': { color: sd('--text-color-default'), textTransform: 'none' }
                }
            }
        },
        MuiTableCell: {
            defaultProps: {
                component: 'th', scope: 'row'
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backdropFilter: sd('--modal-backdrop'),
                },
                paper: {
                    borderRadius: sd('--modal-bradius')
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
                    backgroundColor: sd('--text-color-special')
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '48px',
                        '& input': { height: '100%', padding: '0px 8px' },
                        '&.Mui-focused fieldset': { border: sd('--textfield-border-sel') },
                        '&.Mui-disabled fieldset': { border: sd('--textfield-border-dis') }
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': { color: sd('--textfield-label-sel') },
                        '&.Mui-disabled': { color: sd('--textfield-label-dis') }
                    },
                    '& .MuiFormHelperText-root': { color: 'red' }
                }
            },
            defaultProps: {
                fullWidth: true
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '48px',
                        '& .MuiSelect-select': { height: '100%', padding: '0px 8px' },
                        '&.Mui-focused fieldset': { border: sd('--textfield-border-sel') },
                        '&.Mui-disabled fieldset': { border: sd('--textfield-border-dis') }
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': { color: sd('--textfield-label-sel') },
                        '&.Mui-disabled': { color: sd('--textfield-label-dis') }
                    }
                }
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
                    textTransform: 'none',
                    fontFamily: sd('--text-font')
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--alert-bradius'),
                    minWidth: '30%'
                }
            },
            defaultProps: {
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                TransitionComponent: Fade
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: sd('--alert-bradius'),
                    width: '100%'
                }
            },
            defaultProps: {
                variant: 'filled',
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
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(0, 0, 0, 0.5)', '&::before, &::after': { borderColor: 'rgba(0, 0, 0, 0.5)' },
                    color: 'rgba(0, 0, 0, 0.75)'
                }
            }
        }
    }
})