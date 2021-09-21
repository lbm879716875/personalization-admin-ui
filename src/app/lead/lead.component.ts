import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SortDirection } from '../model/Constants';
import { PersTmplCmpntLeadEffDte } from '../entity/PersTmplCmpntLeadEffDte';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagedEntity } from '../model/PagedEntity';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { codeToRegionMap } from '../model/Constants';
import { TmplCmpntIdDropDown } from '../dropdown/TmplCmpntId';
import { SuplrIdDropDown } from '../dropdown/SuplrId';
import { RegionDropDown } from '../dropdown/Region';
import { PersTmplCmpntLead } from '../entity/PersTmplCmpntLead';
import { MatDialog } from '@angular/material/dialog';
import { LeadtimeEffComponent } from '../leadtime-eff/leadtime-eff.component';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent, openConfirmationDialog } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  displayedColumns: string[] = ['tmplCmpntId', 'regnRefCde', 'suplrId','seqNbr','procNam','procRegnRefCde','procType','leadTimeHvStock','leadTimeWoutStock','ruleJsonCtent','pri','actions'];
  totalCount:number=0;
  dataSource: MatTableDataSource<PersTmplCmpntLead>;
  ELEMENT_DATA: PersTmplCmpntLead[] = [];
  regionMap = codeToRegionMap;
  @ViewChild(TmplCmpntIdDropDown) tmplCmpntIdDropDown!:TmplCmpntIdDropDown;
  @ViewChild(SuplrIdDropDown) suplrIdDropDown!:SuplrIdDropDown;
  @ViewChild(RegionDropDown) regionDropDown!:RegionDropDown;
  constructor(private http:HttpClient,private route:Router,private snackBar:MatSnackBar,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
  }

  async ngOnInit(){
    await this.getList(undefined,undefined,undefined,undefined,undefined,0,10);
    this.dataSource.paginator=this.paginator;
    this.setupSort();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  get(id:number){
    this.http.get('/apis/leadtime/'+id).subscribe(data=>{
      let res :PersTmplCmpntLeadEffDte = data as PersTmplCmpntLeadEffDte;
    });
   
  }
  
  page(){
    let sortBy:string[] = [];
    if(this.sort.active)
      sortBy.push(this.sort.active);
    
    let sortDirection:SortDirection[] = [];
    if((<any>SortDirection)[this.sort.direction.toUpperCase()])
      sortDirection.push((<any>SortDirection)[this.sort.direction.toUpperCase()]);

    this.getList(
      this.getActualInput(this.tmplCmpntIdDropDown.tmplCmpntId),
      this.regionDropDown.region,
      this.getActualInput(this.suplrIdDropDown.suplrId),
      sortBy,sortDirection,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  reload(){
    this.paginator.pageIndex=0;
    this.page();
    this.snackBar.open("reload successfully");
  }

  getActualInput(input:string):string|undefined{
     return input==''?undefined:input;
  }

  add(){
    this.route.navigate(['leadtime/add']);
  }

  updateRow(row:any){
    var data:PersTmplCmpntLead = row as PersTmplCmpntLead;
    this.route.navigate(['leadtime/update'],{state:{data}});
  }

  deleteConfirmation(row:any){
    let dialogRef=openConfirmationDialog(this.dialog,'Are you sure you want to delete?');
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteRow(row);
      }
    });
  }

  deleteRow(row:any){
    var data:PersTmplCmpntLead = row as PersTmplCmpntLead;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "tmplCmpntId":data.tmplCmpntId,
        "regnRefCde":data.regnRefCde!,
        "suplrId":data.suplrId,
        "seqNbr":data.seqNbr.toString()
      },
    };
    this.http.delete<any>("apis/template/component/leadtime",options).subscribe(res=>{
      this.snackBar.open("delete successfully");
      this.reload();
    });
  }

  async getList(tmplCmpntId?:string,region?:string,suplrId?:string,sortBy?:string[],sortDirection?:SortDirection[],pageNo?:number,pageSize?:number){
    var conditions="?";
    if(tmplCmpntId!=null)
      conditions+="tmplCmpntId="+tmplCmpntId+'&';
    if(suplrId!=null)
      conditions+="suplrId="+suplrId+'&';
    if(region!=null)
      conditions+="region="+region+'&';
    if(sortBy!=null&&sortBy.length>0){
      for(let s of sortBy){
        conditions+="sortBy="+s+'&';
      }
    }
    if(sortDirection!=null&&sortDirection.length>0){
      for(let s of sortDirection){
        conditions+="sortDirection="+s+'&';
      }
    }
    if(pageNo!=null)
      conditions+="pageNo="+pageNo+'&';
    if(pageSize!=null)
      conditions+="pageSize="+pageSize+'&';

    
  
    await this.http.get('/apis/template/component/leadtimes' + conditions).toPromise()
    .then(data=>{
      let res :PagedEntity<PersTmplCmpntLead> = data as PagedEntity<PersTmplCmpntLead>;
      this.ELEMENT_DATA=res.list;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.setupSort();
      setTimeout(() =>{
        this.paginator.length=res.totalCount;
      },100);
    }).finally(()=>{
      
    })
    .catch(err=>{
      console.log(err)
      this.ELEMENT_DATA =[];
      this.paginator.length=0;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  manageLeadTime(row:any){
    var data:PersTmplCmpntLead = row as PersTmplCmpntLead;
    let dialogRef = this.dialog.open(LeadtimeEffComponent, {
      data:data,
      height: '90%',
      width: '90%',
    });
  }

  setupSort(){
    this.dataSource.sort=this.sort;
    this.dataSource.sortData=(data,sort:MatSort)=>{
      if(sort.direction&&sort.active){
        let sortBy = [sort.active];
        let sortDirection = [(<any>SortDirection)[sort.direction.toUpperCase()]];
        this.getList(
          this.getActualInput(this.tmplCmpntIdDropDown.tmplCmpntId),
          this.regionDropDown.region,
          this.getActualInput(this.suplrIdDropDown.suplrId),
          sortBy,sortDirection,
          this.paginator.pageIndex,
          this.paginator.pageSize,
        );
      }else{
        this.getList(
          this.getActualInput(this.tmplCmpntIdDropDown.tmplCmpntId),
          this.regionDropDown.region,
          this.getActualInput(this.suplrIdDropDown.suplrId),
          undefined,undefined,
          this.paginator.pageIndex,
          this.paginator.pageSize,
        );
      }
     return this.ELEMENT_DATA;
    }
  }
}
