export type mapDataType = {
    mappingId: number,
    userId: number,
    watershedId: string,
    createdUser: number,
    updatedUser: number,
    remarks: string,
    createdTime: string,
    updatedTime: string
};

districtId
:
1
districtName
:
"Kalaburagi"
gramPanchayatId
:
1
gramPanchayatName
:
"ALGOOD"
stateId
:
1
stateName
:
"Karnataka"
talukId
:
1
talukName
:
"Kalaburagi"

export type wsData = {
    watershedId: number,
    wsName: string,
    wsDescription: string,
    stateId: number;
    stateName: string;
    districtId: number;
    districtName: string;
    talukId: number;
    talukName: string;
    gramPanchayatId: number;
    gramPanchayatName: string;
    villages: [],
}

export type StateType = {
    stateId: number;
    stateName: string;
    createdUser: string;
    updatedUser: string;
    createdTime: string;
    updatedTime: string;
};

export type DistrictType = {
    districtId: number;
    districtName: string;
    stateId: number;
    createdUser: string;
    updatedUser: string;
    createdTime: string;
    updatedTime: string;
};

export type TalukType = {
    talukId: number;
    talukName: string;
    districtId: number;
    createdUser: string;
    updatedUser: string;
    createdTime: string;
    updatedTime: string;
};

export type GramPanchayatType = {
    panchayatId: number;
    panchayatName: string;
    talukId: number;
    createdUser: string;
    updatedUser: string;
    createdTime: string;
    updatedTime: string;
};

export type VillageType = {
    villageId: number;
    villageName: string;
    grampanchayatId: number;
    createdUser: string;
    updatedUser: string;
    createdTime: string;
    updatedTime: string;
};
