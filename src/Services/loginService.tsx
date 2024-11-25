import axios from "axios";
import { serverPath } from '../common';
import Cookies from 'js-cookie';

export async function login(data: any) {
    const configuration = {
        url: serverPath.authserver + `user-profile-service/loginForBfil`,
        method: "post",
        data: data
    };
    try {
        const response = await axios(configuration);
        sessionStorage.setItem("token", response.data.jwtBearer);
        sessionStorage.setItem("refToken", response.data.jwtRefresh);
        sessionStorage.setItem("userId", response.data.user.userId);
        sessionStorage.setItem("userName", response.data.user.userName);
        sessionStorage.setItem("userNumber", response.data.user.mobileNumber);
        sessionStorage.setItem("userType", response.data.user.userType);
        sessionStorage.setItem("applicationId", response.data.user.userCompanyList[0].applicationId);
        sessionStorage.setItem("companyId", response.data.user.userCompanyList[0].companyId);
        sessionStorage.setItem("totalUser", response.data.totalUser);
        sessionStorage.setItem("loggedInUser", response.data.loggedInUser);
        sessionStorage.setItem("features", response.data.user.userCompanyList[0].feature);
        sessionStorage.setItem("permList", JSON.stringify(response.data.permissionList));
        localStorage.setItem("userRole", response.data.user.userRoleList[0].roleName);
        localStorage.setItem("userRoleId", response.data.user.userRoleList[0].roleId);

        Cookies.set('Ta2-jwt-refresh', response.data.jwtRefresh, {
            expires: 7, // Set expiration to 7 days (or adjust as needed)
            secure: true, // Ensure secure cookies in production
            sameSite: 'none', // Prevent cross-site attacks
            path: '/', // Make cookie available across the app
        });

        return response.data;
    } catch (error) {
        throw (error)
    }
}

export async function logout() {
    const configuration = {
        url: serverPath.authserver + "user-profile-service/logoutForBfil",
        method: "post",
        data: {
            address: "address",
            loginId: sessionStorage.getItem("userNumber") || "",
            companyId: serverPath.companyID
        }
    };
    try {
        const response = await axios(configuration); if (response) {
            sessionStorage.clear();
            localStorage.clear();
            return response.data;
        }
    }
    catch (error) { throw (error) }
}

export async function PassReset(data: any) {
    const config = {
        url: serverPath.authserver + "user-profile-service/resetPassword",
        method: "post",
        data: data
    }
    try {
        const response = await axios(config)
        if (response) { return response.data }
    }
    catch (error) { throw (error) }
}

export async function TokenRefresh() {
    const config = {
        url: `${serverPath.authserver}user-profile-service/loginRefreshBasedOnCompany/${serverPath.companyID}`,
        method: "post",
        withCredentials: true
    };

    try {
        const response = await axios(config);
        if (response) { return response.data }
    }
    catch (error) { throw error }
}