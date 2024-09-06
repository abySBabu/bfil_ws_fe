import axios from "axios";
import { serverPath } from '../common';

export async function getRolesByCompany(companyID: any) {
    const configs = {
        url: serverPath.authserver + 'role-service/getRolesByCompany/' + companyID,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    };
    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function permissionByAppId(applicationId: any) {
    const configs = {
        url: serverPath.authserver + 'role-service/permissionByAppId/' + applicationId,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    };

    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function addRolePermission(data: any) {
    const configs = {
        url: serverPath.authserver + 'role-service/roles',
        method: 'post',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        console.log("addRolePermission ---- ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function updateRolePermission(data: any, roleId: any) {
    const configs = {
        url: serverPath.authserver + 'role-service/roles/' + roleId,
        method: 'put',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        console.log("updateRolePermission ---- ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}