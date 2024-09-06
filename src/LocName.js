export const StateName = (id) => {
    const list = JSON.parse(sessionStorage.getItem("StateList")) || null;
    if (list) {
        const obj = list.find(x => x.stateId === id);
        return obj ? obj.stateName : id;
    }
    return id;
}

export const DistrictName = (id) => {
    const list = JSON.parse(sessionStorage.getItem("DistrictList")) || null;
    if (list) {
        const obj = list.find(x => x.districtId === id);
        return obj ? obj.districtName : id;
    }
    return id;
}

export const TalukName = (id) => {
    const list = JSON.parse(sessionStorage.getItem("TalukList")) || null;
    if (list) {
        const obj = list.find(x => x.talukId === id);
        return obj ? obj.talukName : id;
    }
    return id;
}

export const PanName = (id) => {
    const list = JSON.parse(sessionStorage.getItem("PanList")) || null;
    if (list) {
        const obj = list.find(x => x.panchayatId === id);
        return obj ? obj.panchayatName : id;
    }
    return id;
}

export const VillageName = (id) => {
    const list = JSON.parse(sessionStorage.getItem("VillageList")) || null;
    if (list) {
        const obj = list.find(x => x.villageId === id);
        return obj ? obj.villageName : id;
    }
    return id;
}