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
};

export const selectOptions = {
    userTypeOptions: [
        {
            id: 1,
            value: "Sales",
        },
        {
            id: 2,
            value: "Service",
        },
        {
            id: 3,
            value: "Both",
        },
        {
            id: 4,
            value: "Supporter",
        },
        {
            id: 5,
            value: "Routes,Service",
        }
    ],
    loginTypeOptions: [
        {
            id: 1,
            value: "Mobile",
        },
        {
            id: 2,
            value: "Web",
        },
        {
            id: 3,
            value: "Both",
        }
    ],
    locationNeededOptions: [
        {
            id: 1,
            value: "Yes",
        },
        {
            id: 2,
            value: "No",
        }
    ],
    blockedUserOptions: [
        {
            id: 1,
            value: "N",
            dispalyValue: "Active"
        },
        {
            id: 2,
            value: "Y",
            dispalyValue: "Blocked"
        }
    ],
    loginStatusOptions: [
        {
            id: 0,
            value: "Sign In",
            dispalyValue: "Sign In"
        },
        {
            id: 1,
            value: "Sign Out",
            dispalyValue: "Sign Out"
        }
        // {
        //     id: 3,
        //     value: "",
        //     dispalyValue: "Null"
        // }
    ]
}

export type allRoles = {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissionName: string | null;
    companyId: number;
    createdByUserId: number;
    updatedByUserId: number;
    permissionList: {
        permissionId: number;
        permissionName: string;
        applicationId: number;
        permissionDescription: string | null;
        createdByUserId: number | null;
        updatedByUserId: number | null;
        createdTimestamp: string | null;
        updatedTimestamp: string | null;
        rolePermissionSet: any[];
    }[] | null;
}