import axios, { AxiosRequestConfig } from "axios";
import { serverPath } from "../common";

export async function listWS() {
    const configs = {
        url: serverPath.bfil + "wsmaster/getallwatershed",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addWS(data: any) {
    const configs: AxiosRequestConfig = {
        url: `${serverPath.bfil}ws/wsmaster/addwatershed`,
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/vnd.api+json",
        }
    };

    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        console.error('Error occurred while adding watershed:', error);
        throw error;
    }
}

export async function editWS(data: any, id: number) {
    const configs = {
        url: serverPath.bfil + `ws/wsmaster/updateWsById/${id}`,
        method: 'post',
        data: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}