import axios from "axios";
import { serverPath } from "../common";

export async function listFarmer() {
    const configs = {
        url: serverPath.bfil + "ws_farmers/getallFarmers",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addFarmer(data: any) {
    const configs = {
        url: serverPath.bfil + "ws_farmers/addFarmer",
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

export async function editFarmer(data: any, id: any) {
    const configs = {
        url: serverPath.bfil + `ws_farmers/updatebyId/${id}`,
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

export async function deleteFarmer(id: any) {
    const configs = {
        url: serverPath.bfil + `ws_farmers/deleteFarmerById/${id}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}