import axios from "axios";
import { serverPath } from "../common";

export async function donerReport(financialYear: any) {
    const configs = {
        url: serverPath.bfil + `reports/getreportdata/${financialYear}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function watershedReport(financialYear:any) {
    const configs = {
        url: serverPath.bfil + `reports/getWatershedReport/${financialYear}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
           }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

