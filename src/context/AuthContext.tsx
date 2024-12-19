import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import checkTknExpiry from '../TokenCheck';
import { TokenRefresh } from '../Services/loginService';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [expiryDialog, setexpiryDialog] = useState(false);
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refToken");

    const monitorTokenExpiry = useCallback(() => {
        const tokenResult = checkTknExpiry((expired) => {
            if (expired) {
                setTokenExpired(true);
            }
        });

        return () => {
            if (tokenResult?.timerRef) {
                clearTimeout(tokenResult.timerRef);
            }
        };
    }, []);

    useEffect(() => {
        const cleanup = monitorTokenExpiry();
        return cleanup;
    }, [monitorTokenExpiry]);

    useEffect(() => {
        const TknRfr = async () => {
            if (tokenExpired) {
                try {
                    const resp = await TokenRefresh();
                    if (resp) {
                        console.log("Tokens refreshed");
                        setTokenExpired(false);
                        monitorTokenExpiry();
                    }
                    else {
                        console.log("No response for token refresh");
                        setexpiryDialog(true);
                    }
                } catch (error) {
                    console.error("Token refresh failed:", error);
                    setexpiryDialog(true);
                }
            } else if (token && refreshToken && !tokenExpired) {
                setexpiryDialog(true);
            }
        };

        TknRfr();
    }, [tokenExpired, token, refreshToken, monitorTokenExpiry]);


    useEffect(() => {

        if (expiryDialog) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [expiryDialog]);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
