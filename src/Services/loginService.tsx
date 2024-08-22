import axios from "axios";
import { serverPath } from '../common';

export async function login(data: any) {
    const configuration = {
        url: serverPath.authserver + "user-profile-service/login",
        method: "post",
        data: data
    };
    console.log("login", configuration)
    try {
        const response = await axios(configuration);
        console.log('response data', response.data);
        sessionStorage.setItem("token", response.data.jwtBearer);
        sessionStorage.setItem("refToken", response.data.jwtRefresh);
        sessionStorage.setItem("userId", response.data.user.userId);
        sessionStorage.setItem("userName", response.data.user.userName);
        sessionStorage.setItem("userType", response.data.user.userType);
        sessionStorage.setItem("applicationId", response.data.user.userCompanyList[0].applicationId);
        sessionStorage.setItem("companyId", response.data.user.userCompanyList[0].companyId);
        sessionStorage.setItem("totalUser", response.data.totalUser);
        sessionStorage.setItem("loggedInUser", response.data.loggedInUser);
        sessionStorage.setItem("features", response.data.user.userCompanyList[0].feature);

        return response.data;
        // sessionStorage.setItem("roleName", response.data.user.userRoleList[0].roleName);
        // sessionStorage.setItem("companyName", response.data.user.userCompanyList[0].companyName);
        // sessionStorage.setItem("loggedInUserNumber", response.data.user.mobileNumber);
        // sessionStorage.setItem("permissionList", response.data.permissionList.toString());
        // sessionStorage.setItem("companyFeature", response.data.companyFeature.admin_List.toString());
        // sessionStorage.setItem("dashBoardFeatures", response.data.companyFeature.feature.toString());
        // sessionStorage.setItem("companyReportList", response.data.companyFeature.report_List.toString());
        // sessionStorage.setItem("subScribedUserCount", response.data.user.userCompanyList[0].subScribedUserCount);
    } catch (error) {
        throw (error)
    }

};