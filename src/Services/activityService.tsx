import axios from "axios";
import { serverPath } from "../common";

export async function listAct() {
    const configs = {
        url: serverPath.bfil + "data_capture/getalldataCapture",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addAct(data: any) {
    const configs = {
        url: serverPath.bfil + `data_capture/adddatacapture/`,
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

export async function editAct(data: any, id: any) {
    const configs = {
        url: serverPath.bfil + `data_capture/updatedatacapturebyId/${id}`,
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