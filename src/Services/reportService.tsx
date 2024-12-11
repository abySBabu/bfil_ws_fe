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
        url: serverPath.bfil + `reports/getWatershedReport/${financialYear}/${userId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}


