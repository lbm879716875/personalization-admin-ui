import { Input } from "@angular/core";
import { Component, EventEmitter, Output } from "@angular/core";
import { TimeoutError } from "rxjs";
import { StaticService } from "../admin/api/static.service";


class Region {
    display:string='';
    value:string|undefined;
    constructor(display:string,value:string|undefined){
        this.display=display;
        this.value=value;
    }
}

@Component({
    selector: 'regionDropDown',
    template:'<mat-form-field [ngClass]="class" appearance="fill">'+
              '<mat-label>{{label==undefined?"Region":label}}</mat-label>'+
              '<mat-select (selectionChange)=change() [disabled]="disabled" [(ngModel)]="region" name="region">'+
              '<mat-option *ngFor="let region of regions" [value]="region.value">{{region.display}}</mat-option>'+
              '</mat-select>'+
             '</mat-form-field>',
    styles: ['.fix-width {width: 100px;margin: 8pt;} .full-width {width:100%;}']
})
export class RegionDropDown{
    @Output() changeEvent = new EventEmitter<string>();
    @Input() label!:string|undefined;
    @Input() region!:string|undefined;
    @Input() class = 'fix-width';
    @Input() allowAll = true;
    regions:Region[]=[];
    @Input() disabled:boolean=false;
    constructor(private staticService:StaticService){
        this.staticService.getRegions().then(data=>{
            if(this.allowAll)
                this.regions.push(new Region('ALL',undefined));
            for (let i = 0; i < data.length; i++) {
               this.regions.push(new Region(data[i],data[i]));
            }
        });
    }

    change(){
        this.changeEvent.emit();
    }

    

}