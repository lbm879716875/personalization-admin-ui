import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RegionDropDown } from '../dropdown/Region';
import { PersDiscDesc } from '../entity/PersDiscDesc';
import { DetailMode } from '../model/Constants';
import { dbRegionValueMap } from '../model/Constants';
import { MyErrorStateMatcher } from '../util/MyErrorStateMatcher';



@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  @ViewChild(RegionDropDown) regionDropDown!:RegionDropDown;
  mode: DetailMode|undefined;
  persDiscDesc:PersDiscDesc = new PersDiscDesc();

  dbRegionValueMap=dbRegionValueMap;

  discTagFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('P[0-9]{7}'),
  ]);
  statcDescFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[A-Za-z]*'),
  ]);
  statcDescCFormControl = new FormControl('',[
    Validators.required,
  ]);
  statcDescCZhsFormControl = new FormControl('',[
    Validators.required,
  ]);
  
  matcher = new MyErrorStateMatcher();
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private snackBar: MatSnackBar
  ) { 
    this.route.data.subscribe(res=>{
      this.mode=res['mode'];
    });
    if(history.state.data){
      this.persDiscDesc = history.state.data;
    }
  }

  ngOnInit(): void {
    if(this.persDiscDesc.discTag)
        this.discTagFormControl.setValue(this.persDiscDesc.discTag);
    if(this.persDiscDesc.statcDesc)
      this.statcDescFormControl.setValue(this.persDiscDesc.statcDesc);
    if(this.persDiscDesc.statcDescC)
      this.statcDescCFormControl.setValue(this.persDiscDesc.statcDescC);
    if(this.persDiscDesc.statcDescCZhs)
      this.statcDescCZhsFormControl.setValue(this.persDiscDesc.statcDescCZhs);
  }

  updateRecord(){
    this.bindFormControlValue();
    this.http.put<any>("apis/disc-desc/"+this.discTagFormControl.value+"?region="+this.regionDropDown.region,this.persDiscDesc).subscribe(data=>{
      
      this.snackBar.open("update successfully");
    });
  }

  addRecord(){
    if(this.regionDropDown.region){
      this.bindFormControlValue();
      this.http.post<any>("apis/disc-desc?region="+this.regionDropDown.region,this.persDiscDesc).subscribe(data=>{
        
        this.snackBar.open("create successfully");
      });
    }else{
      alert("please select region");
    }
  }

  bindFormControlValue(){
    this.persDiscDesc!.discTag=this.discTagFormControl.value;
    this.persDiscDesc!.statcDesc=this.statcDescFormControl.value;
    this.persDiscDesc!.statcDescC=this.statcDescCFormControl.value;
    this.persDiscDesc!.statcDescCZhs=this.statcDescCZhsFormControl.value;
  }
}


