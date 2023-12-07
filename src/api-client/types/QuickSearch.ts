export enum SEARCH_TYPE {
    Project = "Project",
    AlphaHunter = "AlphaHunter",
    Narrative = "Narrative",
}

type Metadata = {
    username: string;
    name: string;
    profileImageUrl: string;
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
    metadata?: Metadata;
    attributes?: Attribute[]; 
}