import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionDropDown } from '../dropdown/Region';
import { SuplrIdDropDown } from '../dropdown/SuplrId';
import { TmplCmpntIdDropDown } from '../dropdown/TmplCmpntId';
import { PersTmplCmpntLead } from '../entity/PersTmplCmpntLead';

import { codeToRegionMap, DetailMode, regionToCodeMap } from '../model/Constants';
import { MyErrorStateMatcher } from '../util/MyErrorStateMatcher';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {
  mode: DetailMode|undefined;
  lead: PersTmplCmpntLead=new PersTmplCmpntLead();
  @ViewChild(TmplCmpntIdDropDown) tmplCmpntIdDropDown!:TmplCmpntIdDropDown;
  @ViewChild('region') regionDropDown!:RegionDropDown;
  @ViewChild('procRegn') procRegionDropDown!:RegionDropDown;
  @ViewChild(SuplrIdDropDown) suplrIdDropDown!:SuplrIdDropDown;
  regionMap = codeToRegionMap;
  regionToCodeMao = regionToCodeMap;
  leadtimeHaveStockFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[0-9]{1,3}'),
  ]);
  leadtimeWithoutStockFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern('[0-9]{1,3}'),
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private snackBar: MatSnackBar
  ) { 
    this.route.data.subscribe(res=>{
      this.mode=res['mode'];
    });
    if(history.state.data){
      this.lead = history.state.data;
    }
  }

  ngOnInit(): void {
    
  }


  updateRecord(){
    this.setupObjectValue();
    this.http.put<any>("apis/template/component/leadtime",this.lead).subscribe(data=>{
      console.log(data);
      this.snackBar.open("update successfully")
    });
  }

  addRecord(){
    this.setupObjectValue();
    this.http.post<any>("apis/template/component/leadtime",this.lead).subscribe(data=>{
      console.log(data);
      this.snackBar.open("add successfully")
    });
  }

  setupObjectValue(){
    this.lead.tmplCmpntId=this.tmplCmpntIdDropDown.tmplCmpntId;
    this.lead.regnRefCde=regionToCodeMap.get(this.regionDropDown.region!);
    this.lead.suplrId=this.suplrIdDropDown.suplrId;
    this.lead.procRegnRefCde=regionToCodeMap.get(this.procRegionDropDown.region!);
    console.log(this.lead)
  }
}
