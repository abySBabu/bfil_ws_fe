import axios from "axios";
import { serverPath } from "../common";

export async function listState() {
    const configs = {
        url: serverPath.bfil + "state/getState",
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}


// export async function listState() {

//     console.log("header setting "+ `${sessionStorage.getItem("token")}`);
//     const configs = {
//         url: serverPath.bfil + "state/getState",
//         method: 'get',
//         headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             // Authorization: 'Bearer ${sessionStorage.getItem("token")}',
//             Host: 'localhost:8080',
//             Connection: 'keep-alive',
//             'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
//             Accept: 'application/json, text/plain, */*',
//             'sec-ch-ua-mobile': '?0',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//             'sec-ch-ua-platform': '"Windows"',
//             Origin: 'http://localhost:3000',
//             'sec-fetch-site': 'same-site',
//             'sec-fetch-mode': 'cors',
//             'sec-fetch-dest': 'empty',
//             Referer: 'http://localhost:3000/',
//             'Accept-Encoding': 'gzip, deflate, br, zstd',
//             'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
//         }
//     };

//     try {
//         const response = await axios(configs);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

export async function listDistrict() {
    const configs = {
        url: serverPath.bfil + "district/getallDistricts",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listTaluk() {
    const configs = {
        url: serverPath.bfil + "taluk/getallTaluk",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listPanchayat() {
    const configs = {
        url: serverPath.bfil + "gram_panchayat/getAllPanchayat",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function listVillage() {
    const configs = {
        url: serverPath.bfil + "village/getallVillages",
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function talukById(id: any) {
    const configs = {
        url: serverPath.bfil + `taluk/gettalukbydistrictid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function panchayatById(id: any) {
    const configs = {
        url: serverPath.bfil + `gram_panchayat/getpanchayatbyid/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

export async function VillageById(id: any) {
    const configs = {
        url: serverPath.bfil + `village/getVillagesbyId/${id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}