export const frontendVersion:string="1.0";

export enum SortDirection{
    ASC="ASC",DESC="DESC"
}

export enum DetailMode{
    ADD,UPDATE,VIEW
}

export const codeToRegionMap: Map<string,string> = new Map([
    ["R1", "HKG"],
    ["R2", "CHN"],
    ["R3", "TWN"],
    // ["R4", "HK,TW&MC "],
    ["R6", "MAC"]
]);

export const regionToCodeMap: Map<string,string> = new Map([
    ["HKG", "R1"],
    ["CHN", "R2"],
    ["TWN", "R3"],
    ["MAC", "R6"]
]);



export const dbRegionDisplayMap: Map<string,string> = new Map([
    ["SHPD","CN"],
    ["ALPHA","HK&TW"]
]);

export const dbRegionValueMap: Map<string,string> = new Map([
    ["SHPD","CHN"],
    ["ALPHA","HKG"]
]);