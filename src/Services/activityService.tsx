import axios from "axios";
import { serverPath } from "../common";

export async function listAct() {
    const configs = {
        url: serverPath.bfil + `data_capture/getalldataCapture/${sessionStorage.getItem("userId")}/${localStorage.getItem("userRole")}`, //
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addAct(data: any) {
    const configs = {
        url: serverPath.bfil + 'data_capture/addcaptureData',
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

export async function DashKey() {
    const configs = {
        url: serverPath.bfil + `data_capture/getAllDashboardData/${sessionStorage.getItem("userId")}/${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try {
        const response = await axios(configs);
        return response.data;
    }
    catch (error) { console.error(error); throw error; }
}

export async function DashDemand() {
    const configs = {
        url: serverPath.bfil + `data_capture/dashboard-data?interventionType=23&userid=${sessionStorage.getItem("userId")}&type=${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashSupply() {
    const configs = {
        url: serverPath.bfil + `data_capture/dashboard-data?interventionType=22&userid=${sessionStorage.getItem("userId")}&type=${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function actFlowNext(status: any) {
    const configs = {
        url: serverPath.workFlow + `work-service/work-flow/2/${(localStorage.getItem("userRole") as string).replace(/\s+/g, "_")}/Submit/${status}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function actFlowPrev(status: any) {
    const configs = {
        url: serverPath.workFlow + `work-service/work-flow/2/${localStorage.getItem("userRole")}/Reject/${status}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}