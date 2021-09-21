import { Entity } from "../model/Entity";

export class PersTmplCmpntLeadEffDte implements Entity{
    tmplCmpntEffId!:number;
    tmplCmpntId:string='';
    regnRefCde:string|undefined='';
    suplrId:string='';
    seqNbr:number=0;
    effDte:Date=new Date();
    leadTimeHvStock:number=0;
    leadTimeWoutStock:number=0;
    lastModEmplNbr:string='00000';
    lastModDte:Date=new Date();
    statCde:string='A';
}

