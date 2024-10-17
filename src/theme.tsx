import { Fade, createTheme } from '@mui/material';

export const tpaTheme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    '&:hover': { color: 'var(--button-bgcolor-hover-brand)' },
                    '&.Mui-disabled': { color: '#000', opacity: 0.25 }
                }
            }
        }
    }
})

export const bfilTheme = createTheme({
    typography: { fontFamily: 'var(--text-font)' },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 'var(--button-bradius)', color: 'var(--text-color-default)', backgroundColor: 'var(--button-bgcolor-active-brand)', textTransform: 'none', minWidth: '100px',
                    '&:hover': { backgroundColor: 'var(--button-bgcolor-hover-brand)' },
                    '&.Mui-disabled': { color: 'var(--text-color-disabled)', backgroundColor: 'var(--button-bgcolor-disabled)' },
                    '&.MuiButton-outlined': {
                        borderColor: 'var(--button-bgcolor-active-brand)',
                        '&:hover': { borderColor: 'var(--button-bgcolor-hover-brand)' },
                        '&.Mui-disabled': { borderColor: 'var(--button-bgcolor-disabled)' }
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
                    color: 'var(--button-bgcolor-active-brand)',
                    '&:hover': { color: 'var(--button-bgcolor-hover-brand)' },
                    '&.Mui-disabled': { color: 'var(--button-bgcolor-disabled)' }
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: 'var(--button-bradius)', color: 'var(--text-color-special)', backgroundColor: '#fff',
                    '&:hover': { backgroundColor: 'var(--button-bgcolor-hover-brand)', cursor: 'pointer' },
                    '&.Mui-disabled': { color: 'var(--text-color-disabled)', backgroundColor: 'var(--button-bgcolor-disabled)' }
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    position: 'fixed', bottom: 'var(--button-corner)', right: 'var(--button-corner)',
                    color: 'var(--text-color-default)', backgroundColor: 'var(--button-bgcolor-active-brand)', textTransform: 'none',
                    '&:hover': { color: 'var(--text-color-hover)', backgroundColor: 'var(--button-bgcolor-hover-brand)' },
                    '&.Mui-disabled': { color: 'var(--text-color-disabled)', backgroundColor: 'var(--button-bgcolor-disabled)' }
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
                        color: 'var(--button-bgcolor-active-brand)',
                        '&:hover': { color: 'var(--button-bgcolor-active-brand)' }
                    },
                    '&:hover': { color: '#000' }
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    position: 'sticky', top: 0, zIndex: 1,
                    '& .MuiTableRow-root': { backgroundColor: 'var(--table-bgcolor-head)' },
                    '& .MuiTableCell-root': { fontWeight: 'bold', color: 'var(--text-color-default)' }
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': { backgroundColor: 'var(--table-bgcolor-body-default)' },
                    '& .MuiTableCell-root': { color: 'var(--text-color-hover)' }
                }
            }
        },
        MuiTableFooter: {
            styleOverrides: {
                root: {
                    position: 'sticky', bottom: 0, zIndex: 1,
                    '& .MuiTableRow-root': { backgroundColor: 'var(--table-bgcolor-head)' },
                    '& .MuiTableCell-root': { color: 'var(--text-color-default)' }
                }
            }
        },
        MuiTableCell: { styleOverrides: { root: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', wordWrap: 'break-word' } } },
        MuiTableRow: { styleOverrides: { root: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', wordWrap: 'break-word' } } },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backdropFilter: 'var(--modal-backdrop)',
                },
                paper: {
                    borderRadius: 'var(--modal-bradius)'
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
                    padding: 'var(--modal-padding)',
                    color: 'var(--text-color-default)',
                    backgroundColor: 'var(--text-color-special)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: '48px',
                        '& input': { height: '100%', padding: '0px 8px' },
                        '&.Mui-focused fieldset': { border: 'var(--textfield-border-sel)' },
                        '&.Mui-disabled fieldset': { border: 'var(--textfield-border-dis)', opacity: 0.5 }
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': { color: 'var(--textfield-label-sel)' },
                        '&.Mui-disabled': { color: 'var(--textfield-label-dis)', opacity: 0.5 }
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
                        '&.Mui-focused fieldset': { border: 'var(--textfield-border-sel)' },
                        '&.Mui-disabled fieldset': { border: 'var(--textfield-border-dis)' }
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': { color: 'var(--textfield-label-sel)' },
                        '&.Mui-disabled': { color: 'var(--textfield-label-dis)' }
                    }
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'var(--page-nav-bgcolor-sel)',
                        '&:hover': { backgroundColor: 'var(--page-nav-bgcolor-sel)' }
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontFamily: 'var(--text-font)'
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: 'var(--alert-bradius)',
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
                    borderRadius: 'var(--alert-bradius)',
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
                    color: 'var(--text-color-link)',
                    cursor: 'var(--text-styles-pointer)'
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