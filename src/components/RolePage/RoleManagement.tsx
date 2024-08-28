export type rolesByCompanyId = {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissionName: string;
    companyId: number;
    createdByUserId: number;
    updatedByUserId: number | null;
    permissionList: any[];
}

export type permissionByAppID = {
    permissionId: number;
    permissionName: string;
    applicationId: number;
    permissionDescription: string | null;
    createdByUserId: number;
    updatedByUserId: number;
}