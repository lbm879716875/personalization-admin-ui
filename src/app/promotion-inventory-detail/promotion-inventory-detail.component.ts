import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RegionDropDown } from '../dropdown/Region';
import { PersInvntDisc } from '../entity/PersInvntDisc';
import { DetailMode } from '../model/Constants';
import { regionToCodeMap } from '../model/Constants';
import { codeToRegionMap } from '../model/Constants';
import { MyErrorStateMatcher } from '../util/MyErrorStateMatcher';



@Component({
  selector: 'app-promotion-inventory-detail',
  templateUrl: './promotion-inventory-detail.component.html',
  styleUrls: ['./promotion-inventory-detail.component.css'],
  
})
export class PromotionInventoryDetailComponent implements OnInit {
  db:string='';
  mode: DetailMode|undefined;

  @ViewChild(RegionDropDown) regionDropDown!:RegionDropDown;
  regionToCodeMap=regionToCodeMap;
  codeToRegionMap=codeToRegionMap;
  
  persInvntDisc:PersInvntDisc = new PersInvntDisc();
  discTag:string='';
  discTagFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('P[0-9]{7}'),
  ]);
  invntIdFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[0-9]{11}(,[0-9]{11})*'),
  ]);

  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  matcher = new MyErrorStateMatcher();
  constructor(private route: ActivatedRoute,
    private http:HttpClient,
    private snackBar: MatSnackBar,
    ) { 
    this.route.data.subscribe(res=>{
      this.mode=res['mode'];
    });
    this.db=history.state.db;
    if(history.state.data){
      this.persInvntDisc = history.state.data;
    }
    route.params.subscribe(res=>{
      this.discTag=res.discTag;
    });
  }

  ngOnInit(): void {
    this.discTagFormControl.setValue(this.discTag);
    if(this.persInvntDisc.invntId)
        this.invntIdFormControl.setValue(this.persInvntDisc.invntId);
    if(this.persInvntDisc.startDte)
      this.startDateFormControl.setValue(new Date(this.persInvntDisc.startDte));
    if(this.persInvntDisc.endDte)
      this.endDateFormControl.setValue(new Date(this.persInvntDisc.endDte));
  }

  updateRecord(){
    this.bindFormControlValue();
    this.http.put<any>("apis/invnt-disc/"+this.discTag+'?db='+this.db,this.persInvntDisc).subscribe(data=>{
      console.log(data);
      this.snackBar.open("update successfully");
    });
  }

  addRecord(){
    this.bindFormControlValue();
    this.http.post<any>("apis/invnt-disc?db="+this.db,this.persInvntDisc).subscribe(data=>{
      this.snackBar.open("create successfully");
    });
  }

  bindFormControlValue(){
    this.persInvntDisc!.invntId=this.invntIdFormControl.value;
    this.persInvntDisc!.regnRefCde=regionToCodeMap.get(this.regionDropDown.region!);
    this.persInvntDisc!.discTag=this.discTagFormControl.value;
    this.persInvntDisc!.startDte=this.startDateFormControl.value;
    this.persInvntDisc!.endDte=this.endDateFormControl.value;
  }
}
