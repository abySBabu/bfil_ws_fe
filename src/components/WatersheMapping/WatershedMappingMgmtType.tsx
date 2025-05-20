export type mapDataType = {
	mappingId: number,
	userId: number,
	watershedId: string,
	createdUser: number,
	updatedUser: number,
	remarks: string,
	createdTime: string,
	updatedTime: string,
	roleId: number
};

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

export type wpData = {
	wsId: string,
	wsName: string,
	wsDescription: string,
	state: StateType;
	district: DistrictType;
	taluk: TalukType;
	gramPanchayat: GramPanchayatType;
	villages: string,
	villageIds:string,
	 mapLink: string,
    createdAt: string,
    updatedAt:string,
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
