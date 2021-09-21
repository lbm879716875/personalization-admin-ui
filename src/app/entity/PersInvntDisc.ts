import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Entity } from "../model/Entity";
import { LOCALE_ID } from '@angular/core';

export class PersInvntDisc implements Entity{
    invntId:string='';
    regnRefCde:string|undefined='';
    discTag:string='';
    startDte:Date;
    endDte:Date;
    lastModEmplNbr:string='00000';
    lastModDte:Date=new Date();
    constructor(){
        var d = new Date(new DatePipe('en').transform(new Date(),'yyyy-MM-dd')!);
        var userTimezoneOffset = d.getTimezoneOffset() * 60000;
        var date=new Date(d.getTime() + userTimezoneOffset);
        this.startDte=date;
        this.endDte=date;
    }
}