export enum SEARCH_TYPE {
    Project = "Project",
    AlphaHunter = "AlphaHunter",
    Narrative = "Narrative",
}

type Attribute = {
    code: string;
    name: string;
    type: string;
}

export type SearchItem = {
    type: SEARCH_TYPE;
    key: number;
    displayName: string;
    sortOrder: number;
    metadata?: string;
    attributes?: Attribute[]; 
}