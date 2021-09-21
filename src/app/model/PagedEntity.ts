export class PagedEntity<T>{
    totalCount:number;
    list:T[];
    constructor(totalCount:number,list:T[]){
        this.totalCount=totalCount;
        this.list=list;
    }
}