import axios from "axios";
import { serverPath } from "../common";

export async function listWSMap() {
    const configs = {
        url: serverPath.bfil + "ws_mapping/GetAllMappings",
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addWS(data: any) {
    const configs = {
        url: serverPath.bfil + "ws_mapping/addwsmapping",
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}


export async function editWS(data: any, id: any) {
    const configs = {
        url: serverPath.bfil + `ws_mapping/updatemappingbyid/${id}`,
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}