import axios from "axios";
import { serverPath } from "../common";

export async function listAct() {
    const configs = {
        url: serverPath.bfil + `data_capture/getalldataCapture/${localStorage.getItem("userId")}/${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashKey() {
    const configs = {
        url: serverPath.bfil + `data_capture/getAllDashboardData/${localStorage.getItem("userId")}/${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try {
        const response = await axios(configs);
        return response.data;
    }
    catch (error) { console.error(error); throw error; }
}

export async function DashDemand() {
    const configs = {
        url: serverPath.bfil + `data_capture/dashboard-data?interventionType=23&userid=${localStorage.getItem("userId")}&type=${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashSupply() {
    const configs = {
        url: serverPath.bfil + `data_capture/dashboard-data?interventionType=22&userid=${localStorage.getItem("userId")}&type=${localStorage.getItem("userRole")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function actFlowNext(role: any, status: any) {
    const configs = {
        url: serverPath.workFlow + `work-service/work-flow/${localStorage.getItem("applicationId")}/${role.replace(/\s+/g, "_")}/Submit/${status.replace(/\s+/g, "_")}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function actFlowPrev(role: any, status: any) {
    const configs = {
        url: serverPath.workFlow + `work-service/work-flow/${localStorage.getItem("applicationId")}/${role.replace(/\s+/g, "_")}/Reject/${status.replace(/\s+/g, "_")}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function userDeleteCheck(id: any) {
    const configs = {
        url: serverPath.bfil + `data_capture/userDeleteOrNot/${id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function DashGraph() {
    const configs = {
        url: serverPath.bfil + `data_capture/getChartData/${localStorage.getItem("userId")}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function uploadSelectedFile(formData: any, workActivityId:any) {
let uName = localStorage.getItem("userName");
  const config = {
    method: "post",
    url: serverPath.bfil + `data_capture/uploadWebFile`,
    data: {
        workActivityId: Number(workActivityId),
        createdUser: uName,
        image: formData},
    headers: { 
      Authorization:  `Bearer ${localStorage.getItem("token")}`,   
      "Content-Type": "multipart/form-data", 
    },
}

  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}
