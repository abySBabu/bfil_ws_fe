export const StateName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("StateList")) || null;
        if (list) {
            const obj = list.find(x => x.stateId === id);
            return obj ? obj.stateName : id;
        }
        return id;
    }
    return ("")
}

export const DistrictName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("DistrictList")) || null;
        if (list) {
            const obj = list.find(x => x.districtId === id);
            return obj ? obj.districtName : id;
        }
        return id;
    }
    return ("")
}

export const TalukName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("TalukList")) || null;
        if (list) {
            const obj = list.find(x => x.talukId === id);
            return obj ? obj.talukName : id;
        }
        return id;
    }
    return ("")
}

export const PanName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("PanList")) || null;
        if (list) {
            const obj = list.find(x => x.panchayatId === id);
            return obj ? obj.panchayatName : id;
        }
        return id;
    }
    return ("")
}

export const WsName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("WsList")) || null;
        if (list) {
            const obj = list.find(x => x.wsId === id);
            return obj ? obj.wsName : id;
        }
        return id;
    }
    return ("")
}

export const VillageName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(sessionStorage.getItem("VillageList")) || null;
        if (list) {
            const obj = list.find(x => x.villageId === id);
            return obj ? obj.villageName : id;
        }
        return id;
    }
    return ("")
}

export const DateTime = (dt) => new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })