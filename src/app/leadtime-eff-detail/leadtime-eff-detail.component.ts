import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersTmplCmpntLeadEffDte } from '../entity/PersTmplCmpntLeadEffDte';
import { DetailMode } from '../model/Constants';
import { MyErrorStateMatcher } from '../util/MyErrorStateMatcher';

@Component({
  selector: 'app-leadtime-eff-detail',
  templateUrl: './leadtime-eff-detail.component.html',
  styleUrls: ['./leadtime-eff-detail.component.css']
})
export class LeadtimeEffDetailComponent implements OnInit {
  mode: DetailMode;
  leadtimeEff:PersTmplCmpntLeadEffDte|undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,private snackBar: MatSnackBar) {
    this.mode=data.detailMode;
    this.leadtimeEff=this.data.data;
  }
  effDateFormControl = new FormControl();
  leadtimeHaveStockFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[0-9]{1,3}'),
  ]);
  leadtimeWithoutStockFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[0-9]{1,3}'),
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    if(this.leadtimeEff!.effDte)
      this.effDateFormControl.setValue(new Date(this.leadtimeEff!.effDte));
    if(this.leadtimeEff!.leadTimeHvStock)
      this.leadtimeHaveStockFormControl.setValue(this.leadtimeEff!.leadTimeHvStock);
    if(this.leadtimeEff!.leadTimeWoutStock)
      this.leadtimeWithoutStockFormControl.setValue(this.leadtimeEff!.leadTimeWoutStock);
  }

  updateRecord(){
    this.setupObjectValue();
    this.http.put<any>("apis/template/component/leadtime/effective/"+this.leadtimeEff!.tmplCmpntEffId,this.leadtimeEff).subscribe(data=>{
      console.log(data);
      this.snackBar.open("update successfully")
    });
  }

  addRecord(){
    this.setupObjectValue();
    this.http.post<any>("apis/template/component/leadtime/effective",this.leadtimeEff).subscribe(data=>{
      console.log(data);
      this.snackBar.open("add schedule successfully")
    });
  }

  setupObjectValue(){
    this.leadtimeEff!.leadTimeHvStock=this.leadtimeHaveStockFormControl.value;
    this.leadtimeEff!.leadTimeWoutStock=this.leadtimeWithoutStockFormControl.value;
    this.leadtimeEff!.effDte=this.effDateFormControl.value;
  }
}
