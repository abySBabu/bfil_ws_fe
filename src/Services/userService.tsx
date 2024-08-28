import axios from "axios";
import { serverPath } from '../common';


export async function usersList(companyId: any) {
    const configuration = {
        url: serverPath.authserver + 'user-service/getUserByCompanyId/' + companyId,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    };
    try { const response = await axios(configuration); return response.data; }
    catch (error) { throw error }
}

export async function getRolesByCompany(companyId: any) {
    const configuration = {
        url: serverPath.authserver + 'role-service/getRolesByCompany/' + companyId,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    };

    try {
        const response = await axios(configuration);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function createUser(data: any) {
    const configs = {
        url: serverPath.authserver + 'user-service/users',
        method: 'post',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function updateUserDetails(data: any, userId: any) {
    const configs = {
        url: serverPath.authserver + 'user-service/users/' + userId,
        method: 'put',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        console.log("createUser---", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export async function blockUser(data: any) {
    const configs = {
        url: serverPath.authserver + 'user-service/blockUser',
        method: 'post',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        console.log("blockUser---", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}


export async function addOrUpdateUserDetails(data: any) {
    const configs = {
        url: serverPath.authserver + 'userDetails-service/addOrUpdateUserDetails',
        method: 'post',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: data
    };

    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}