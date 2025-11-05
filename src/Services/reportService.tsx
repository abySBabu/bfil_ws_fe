import axios from "axios";
import { serverPath } from "../common";

export async function donerReport(financialYear: any) {
    const configs = {
        url: serverPath.bfil + `reports/getreportdata/${financialYear}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function watershedReport(financialYear:any,userId:number) {
    const configs = {
        url: serverPath.bfil + `reports/getWatershedReport/${financialYear}/${userId}/${localStorage.getItem("userRole")}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function ActivityReport(financialYear:any) {
    const configs = {
        url: serverPath.bfil + `activity/year/${financialYear}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function activityReport(financialYear:any,userId:number,activityId:number) {
    const configs = {
       url: serverPath.bfil + `reports/getLocationReport/${financialYear}/${userId}/${activityId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function beneficiaryReport(param:string, id: number){
    const configs ={
        url: serverPath.bfil +`ws_farmers/getFarmerReport?${param}=${id}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

