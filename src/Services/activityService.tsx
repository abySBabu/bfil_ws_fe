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
        url: serverPath.bfil + "data_capture/getAllDashboardData",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashDemand() {
    const configs = {
        url: serverPath.bfil + "data_capture/dashboard-data?interventionType=Demand Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashSupply() {
    const configs = {
        url: serverPath.bfil + "data_capture/dashboard-data?interventionType=Supply Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function actFlowNext(status: any) {
    const configs = {
        url: `http://172.104.56.206:9061/wf/work-service/work-flow/2/Activity Work Flow/Submit/${status}`,
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
        url: `http://172.104.56.206:9061/wf/work-service/work-flow/2/Activity Work Flow/Reject/${status}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}