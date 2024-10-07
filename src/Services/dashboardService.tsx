import axios from "axios";
import { serverPath } from "../common";

export async function ListKey() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Indicators",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListInter() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListSupply() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Supply Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListDemand() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Demand Side Interventions",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListFund() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Fund Source",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListLand() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Land Type",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListSide() {
    const configs = {
        url: serverPath.bfil + "ws_screen/GetAllScreen",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ListDonor() {
    const configs = {
        url: serverPath.bfil + "parameter/getParameterByType?parameterType=Component",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}