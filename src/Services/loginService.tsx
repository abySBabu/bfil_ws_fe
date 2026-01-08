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
        localStorage.setItem("token", response.data.jwtBearer);
        localStorage.setItem("refToken", response.data.jwtRefresh);
        localStorage.setItem("userId", response.data.user.userId);
        localStorage.setItem("userName", response.data.user.userName);
        localStorage.setItem("userNumber", response.data.user.mobileNumber);
        localStorage.setItem("userType", response.data.user.userType);
        localStorage.setItem("applicationId", response.data.user.userCompanyList[0].applicationId);
        localStorage.setItem("companyId", response.data.user.userCompanyList[0].companyId);
        localStorage.setItem("totalUser", response.data.totalUser);
        localStorage.setItem("loggedInUser", response.data.loggedInUser);
        localStorage.setItem("features", response.data.user.userCompanyList[0].feature);
        localStorage.setItem("permList", JSON.stringify(response.data.permissionList));
        localStorage.setItem("userRole", response.data.user.userRoleList[0].roleName);
        localStorage.setItem("userRoleId", response.data.user.userRoleList[0].roleId);

        Cookies.set('Ta2-jwt-refresh', response.data.jwtRefresh, {
            expires: 1,
            secure: true,
            sameSite: 'strict',
            path: '/'
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
            loginId: localStorage.getItem("userNumber") || "",
            companyId: serverPath.companyID
        }
    };
    try {
        const response = await axios(configuration); if (response) {
            localStorage.clear();
            sessionStorage.clear();
            return response.data;
        }
    }
    catch (error) { throw (error) }
}

export async function PassReset(data: any) {
    const config = {
        url: serverPath.authserver + "user-profile-service/resetPasswordByCompanyId",
        method: "post",
        data: { ...data, companyId: serverPath.companyID }
    }
    try {
        const response = await axios(config)
        if (response) { return response.data }
    }
    catch (error) { throw (error) }
}

export async function TokenRefresh() {
    const refToken = localStorage.getItem('refToken');
    const config = {
        url: `${serverPath.authserver}user-profile-service/loginRefreshBasedOnCompany/${serverPath.companyID}`,
        method: "post",
        params: { jwtRefreshCookie: refToken }
    };

    try {
        const response = await axios(config);
        if (response) {
            localStorage.setItem("token", response.data.jwtBearer);
            localStorage.setItem("refToken", response.data.jwtRefresh);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}
