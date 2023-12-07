import localforage from "localforage";
import { SEARCH_TYPE, SearchItem } from "@/api-client/types/QuickSearch"

export const setQuickSearchData = (projects: SearchItem[], narratives: SearchItem[], alphahunters: SearchItem[]) => {
    localforage.setItem("projects", JSON.stringify(projects));
    localforage.setItem("narratives", JSON.stringify(narratives));
    localforage.setItem("alphahunters", JSON.stringify(alphahunters));
}

export const getSearchDataByType = async (type: SEARCH_TYPE) => {
    if (type === SEARCH_TYPE.Narrative) {
        const data: any = await localforage.getItem("narratives");
        const narratives = JSON.parse(data);
        return narratives as SearchItem[];
    }

    if (type === SEARCH_TYPE.AlphaHunter) {
        const alphahunters = await localforage.getItem("alphahunters")
        return alphahunters as SearchItem[];
    }

    const projects = await localforage.getItem("projects");
    return projects as SearchItem[];
}

export const filterDataSearch = (data: any, keys: string[], searchString: string) => {
    return data?.filter((obj: any) => {
        return keys.some(key => obj.hasOwnProperty(key) && obj[key].includes(searchString.toLowerCase()));
    });
}