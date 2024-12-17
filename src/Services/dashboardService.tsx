import axios from "axios";
import { serverPath } from "../common";

export async function ListPara(para: any) {
    const configs = {
        url: serverPath.bfil + `parameter/getParameterByType?parameterType=${para}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListKey() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Indicators",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListInter() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListSupply() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Supply Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListDemand() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Demand Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListFund() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Fund Source",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListLand() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Land Type",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListSide(status: any) {
    const configs = {
        url: serverPath.bfil + `ws_screen/GetAllScreen/${localStorage.getItem("userId")}/${status}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListStatus() {
    const configs = {
        url: serverPath.bfil + `status_mapping/getAllMappingStatus`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListDonor() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Component",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListRelation() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByParameterType?parameterType=Relationship",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}