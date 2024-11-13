
export type ActivitySources = {
    [key: string]: number;
    IBL: number;
    BFIL: number;
    "Other Gov Scheme": number;
    MGNREGA: number;
    Community: number;
    Other: number;
};

export type Activities = {
    [activityName: string]: ActivitySources;
};

export interface ComponentData {
    components: string;
    activities: Activities;
    
}