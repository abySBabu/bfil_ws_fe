import axios from "axios";
import { serverPath } from "../common";

export async function listWP() {
    const configs = {
        url: serverPath.bfil + "workplan/getAllWorkplan",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function addWP(data: any) {
    const configs = {
        url: serverPath.bfil + "workplan/addworkplan",
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

export async function editWP(data: any, id: any) {
    const configs = {
        url: serverPath.bfil + `workplan/updateWorkPlan/${id}`,
        method: 'put',
        data: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/vnd.api+json'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listFinYear() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Financial Year",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}