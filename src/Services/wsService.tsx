import axios from "axios";
import { serverPath, tkn } from "../common";

export async function listWS() {
    const configs = {
        url: serverPath.bfil + "wsmaster/getallwatershed",
        method: 'get',
        headers: { Authorization: tkn }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addWS(data: any) {
    const configs = {
        url: serverPath.bfil + "wsmaster/addwatershed",
        method: 'post',
        data: data,
        headers: { Authorization: tkn }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function editWS(data: any, id: number) {
    const configs = {
        url: serverPath.bfil + `wsmaster/updateWsById/${id}`,
        method: 'post',
        data: data,
        headers: { Authorization: tkn }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}