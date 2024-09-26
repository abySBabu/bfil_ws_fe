export type mapDataType = {
    mappingId:number,
    userId: number,
    watershedId: string,
    createdUser: number,
    updatedUser: number,
    remarks: string,
    createdTime: string,
    updatedTime: string
};

export type wsData= {
    wsId: number,
    wsName: string,
    wsDescription: string,
    stateId: number,
    districtId: number,
    talukId: number,
    grampanchayatId: number,
    villageId: number,
    mapLink: string
}
