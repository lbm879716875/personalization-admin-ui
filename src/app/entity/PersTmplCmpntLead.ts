import { Entity } from "../model/Entity";

export class PersTmplCmpntLead implements Entity{
    tmplCmpntId:string='';
    regnRefCde:string|undefined='';
    suplrId:string='';
    seqNbr:number=0;
    procNam:string='';
    procRegnRefCde:string|undefined='';
    procType:string='';
    leadTimeHvStock:number=0;
    lastModEmplNbr:string='00000';
    lastModDte:Date=new Date();
    leadTimeWoutStock:number=0;
    ruleJsonCtent:string='';
    pri:number=0;
    statCde:string='A';
}

