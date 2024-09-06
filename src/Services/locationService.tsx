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

export async function listTaluk() {
    const configs = {
        url: serverPath.bfil + "taluk/getallTaluk",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listPanchayat() {
    const configs = {
        url: serverPath.bfil + "gram_panchayat/getAllPanchayat",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listVillage() {
    const configs = {
        url: serverPath.bfil + "village/gatallVillages",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function talukById(id: any) {
    const configs = {
        url: serverPath.bfil + `taluk/gettalukbydistrictid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function panchayatById(id: any) {
    const configs = {
        url: serverPath.bfil + `gram_panchayat/getpanchayatbyid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function VillageById(id: any) {
    const configs = {
        url: serverPath.bfil + `village/getVillagesbyById/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}