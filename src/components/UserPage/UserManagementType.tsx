export type allUserType = {
    userId: number;
    userName: string;
    userDesignation: string;
    userEmailId: string;
    mobileNumber: string;
    userPassword: string;
    userOtp: string | null;
    userBlockedFlag: string;
    userDeleteFlag: string;
    signOutFlag: string | null;
    loginType: number;
    createdByUserId: number;
    updatedByUserId: number | null;
    authenticatedUserFlag: string | null;
    loginFlag: string | null;
    userType: string;
    userCode: string;
    imei: string;
    createdTimestamp:string;
    updatedTimestamp:string;
    managerName: string;
    userRoleList: {
        roleId: number;
        roleName: string;
    }[];
    userCompanyList: {
        companyId: number;
        companyName: string | null;
        companyStatus: string;
        displayName: string | null;
        subScribedUserCount: number;
        companyLogoURL: string;
        applicationId: number;
        feature: any | null;
        taskType: any | null;
    }[];
}