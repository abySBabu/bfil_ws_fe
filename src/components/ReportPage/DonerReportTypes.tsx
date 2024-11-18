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

export interface Physical {
    plan: number | null;
    progress: number | null;
  }
  
  export interface Financial {
    plan: number | null;
    progress: number | null;
  }
  export interface WorkPlan {
    planningYear: string;
    activityId?: number; 
    activityName?: string; 
    }
  
    export interface Watershed {
    watershedName: string;
    landType: string;
    uom: string;
    physical: Physical;
    financial: Financial;
  }
  
  export interface ReportData {
    activityName: string;
    watersheds: { [key: string]: Watershed };
  }