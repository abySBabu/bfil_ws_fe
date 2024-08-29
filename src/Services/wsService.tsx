import axios from "axios";
import { serverPath } from "../common";

export async function listWS() {
    const configs = {
        url: serverPath.bfil + "ws/wsmaster/getallwatershed",
        method: 'post',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addWS(data: any) {
    const configs = {
        url: serverPath.bfil + "ws/wsmaster/addwatershed",
        method: 'post',
        data: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
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