import { Entity } from "../model/Entity";

export class PersDiscDesc implements Entity{
    discTag:string='';
    db:string='';
    statCde:string='A';
    lastModEmplNbr:string='00000';
    lastModDte:Date=new Date();
    statcDesc:string='';
    statcDescC:string='';
    statcDescCZhs:string='';
    invntCount:number=0;
}