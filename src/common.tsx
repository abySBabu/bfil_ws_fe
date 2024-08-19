import { createTheme } from '@mui/material/styles';

export const serverPath = { authserver: "http://172.104.56.206:9077/auth/" }

export const sd = (css: string) => (getComputedStyle(document.documentElement).getPropertyValue(css).trim())

export const appTheme = createTheme({
    palette: { primary: { main: sd('--text-color-hover') } },
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
                    position: 'fixed', bottom: '32px', right: '32px',
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
        MuiModal: {
            styleOverrides: {
                root: {
                    position: 'absolute', top: sd('--modal-position-top'), left: sd('--modal-position-left'),
                    transform: sd('--modal-position-transform'), backdropFilter: sd('--modal-backdrop'), 
                    zIndex: sd('--modal-zindex')
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid black'
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    borderTop: '1px solid black'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: sd('--text-color-disabled') },
                        '&.Mui-focused fieldset': { borderColor: sd('--text-color-special'), },
                    }
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
        }
    }
})