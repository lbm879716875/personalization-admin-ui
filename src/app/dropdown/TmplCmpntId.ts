import { Input } from "@angular/core";
import { Component, EventEmitter, Output } from "@angular/core";
import { StaticService } from "../admin/api/static.service";

class TmplCmpntId {
    display:string='';
    value:string|undefined;
    constructor(display:string,value:string|undefined){
        this.display=display;
        this.value=value;
    }
}

@Component({
    selector: 'tmplCmpntIdDropDown',
    template:'<mat-form-field [ngClass]="class" appearance="fill">'+
              '<mat-label>Template Component Id</mat-label>'+
              '<mat-select (selectionChange)=change() [disabled]="disabled" [(ngModel)]="tmplCmpntId" name="tmplCmpntId">'+
               '<mat-option *ngFor="let tmplCmpntId of tmplCmpntIds" [value]="tmplCmpntId.value">{{tmplCmpntId.display}}</mat-option>'+
              '</mat-select>'+
             '</mat-form-field>',
    styles: ['.fix-width {width: 220px;margin: 8pt;} .full-width {width:100%;}']
})
export class TmplCmpntIdDropDown{
    @Output() changeEvent = new EventEmitter<string>();
    @Input() tmplCmpntId!:string;
    @Input() class = 'fix-width';
    tmplCmpntIds: TmplCmpntId[]=[];
    @Input() allowAll = true;
    @Input() disabled:boolean=false;
    constructor(private staticService:StaticService){
        this.staticService.getComponentIds().then(data=>{
            if(this.allowAll)
                this.tmplCmpntIds.push(new TmplCmpntId('ALL',undefined));
            for (let i = 0; i < data.length; i++) {
                this.tmplCmpntIds.push(new TmplCmpntId(data[i],data[i]));
             }
        });
    }

    change(){
        this.changeEvent.emit();
    }

    

}