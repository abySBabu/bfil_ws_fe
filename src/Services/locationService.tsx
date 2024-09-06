import axios from "axios";
import { serverPath } from "../common";

export async function listState() {
    const configs = {
        url: serverPath.bfil + "state/getState",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listDistrict() {
    const configs = {
        url: serverPath.bfil + "district/getallDistricts",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listTaluk(id: number) {
    const configs = {
        url: serverPath.bfil + `taluk/gettalukbydistrictid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listPanchayat(id: number) {
    const configs = {
        url: serverPath.bfil + `gram_panchayat/getpanchayatbyid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listVillage(id: number) {
    const configs = {
        url: serverPath.bfil + `village/getVillagesbyId/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}