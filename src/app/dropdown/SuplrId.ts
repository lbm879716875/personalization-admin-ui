import { Input } from "@angular/core";
import { Component, EventEmitter, Output } from "@angular/core";
import { StaticService } from "../admin/api/static.service";

class Suplr{
    display:string='';
    value:string|undefined;
    constructor(display:string,value:string|undefined){
        this.display=display;
        this.value=value;
    }
}

@Component({
    selector: 'suplrIdDropDown',
    template:'<mat-form-field [ngClass]="class" appearance="fill">'+
              '<mat-label>Supler Id</mat-label>'+
              '<mat-select (selectionChange)=change() [disabled]="disabled" [(ngModel)]="suplrId" name="suplrId">'+
               '<mat-option *ngFor="let suplr of suplrIds" [value]="suplr.value">{{suplr.display}}</mat-option>'+
              '</mat-select>'+
             '</mat-form-field>',
    styles: ['.fix-width {width: 120px;margin: 8pt;} .full-width {width:100%;}']
})
export class SuplrIdDropDown{
    @Output() changeEvent = new EventEmitter<string>();
    @Input() suplrId!:string;
    suplrIds:Suplr[]=[];
    @Input() class = 'fix-width';
    @Input() allowAll = true;
    @Input() disabled:boolean=false;
    constructor(private staticService:StaticService){
        this.staticService.getSuplerIds().then(data=>{
            if(this.allowAll)
                this.suplrIds.push(new Suplr('ALL',undefined));
            for (let i = 0; i < data.length; i++) {
                this.suplrIds.push(new Suplr(data[i],data[i]));
             }
        });
    }

    change(){
        this.changeEvent.emit();
    }

    

}