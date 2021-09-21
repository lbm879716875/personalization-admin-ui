import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersTmplCmpntLead } from '../entity/PersTmplCmpntLead';
import { LeadtimeEffDetailComponent } from '../leadtime-eff-detail/leadtime-eff-detail.component';
import { codeToRegionMap, DetailMode } from '../model/Constants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersTmplCmpntLeadEffDte } from '../entity/PersTmplCmpntLeadEffDte';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SortDirection } from '@angular/material/sort';
import { RegionDropDown } from '../dropdown/Region';
import { PagedEntity } from '../model/PagedEntity';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leadtime-eff',
  templateUrl: './leadtime-eff.component.html',
  styleUrls: ['./leadtime-eff.component.css']
})
export class LeadtimeEffComponent implements OnInit {
  lead: PersTmplCmpntLead=new PersTmplCmpntLead();
  codeToRegionMap = codeToRegionMap;
  catalogItemQty=0;
  hideCatalogItem=true;
  dataSource: MatTableDataSource<PersTmplCmpntLeadEffDte>;
  displayedColumns: string[] = ['effDte', 'leadTimeHvStock', 'leadTimeWoutStock','statCde','lastModDte','actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(RegionDropDown) regionDropDown!:RegionDropDown;
  ELEMENT_DATA: PersTmplCmpntLeadEffDte[] = [];
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public paramLead: PersTmplCmpntLead,private http:HttpClient) {
    this.dataSource = new MatTableDataSource();
    this.lead=paramLead;
    if(this.lead&&this.lead.ruleJsonCtent)
      this.catalogItemQty+=this.lead.ruleJsonCtent.split(",").length;
  }

  async ngOnInit(){
    await this.getList(undefined,undefined,0,10);
    this.dataSource.paginator=this.paginator;
  }

  triggerCatalogItem(){
    this.hideCatalogItem=!this.hideCatalogItem;
  }
 
  showDetail(){
    let dialogRef = this.dialog.open(LeadtimeEffDetailComponent, {
      height: '80%',
      width: '70%',
    });
  }

  page(){
    this.getList(
      undefined,undefined,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  async getList(sortBy?:string[],sortDirection?:SortDirection[],pageNo?:number,pageSize?:number){
    var conditions="?";
    conditions+="tmplCmpntId="+this.lead.tmplCmpntId+'&';
    conditions+="suplrId="+this.lead.suplrId+'&';
    conditions+="region="+codeToRegionMap.get(this.lead.regnRefCde!)+'&';
    conditions+="seqNbr="+this.lead.seqNbr+'&';
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

    
  
    await this.http.get('/apis/template/component/leadtime/effectives' + conditions).toPromise()
    .then(data=>{
      let res :PagedEntity<PersTmplCmpntLeadEffDte> = data as PagedEntity<PersTmplCmpntLeadEffDte>;
      this.ELEMENT_DATA=res.list;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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

  updateRow(row:any){
    var data:PersTmplCmpntLeadEffDte = row as PersTmplCmpntLeadEffDte;
    let dialogRef = this.dialog.open(LeadtimeEffDetailComponent, {
      data:{
        data:data,
        detailMode:DetailMode.UPDATE
      },
      height: '80%',
      width: '70%',
    });
  }

  addSchedule(){
    let data:PersTmplCmpntLeadEffDte = new PersTmplCmpntLeadEffDte();
    data.tmplCmpntId=this.lead.tmplCmpntId;
    data.suplrId=this.lead.suplrId;
    data.seqNbr=this.lead.seqNbr;
    data.regnRefCde=this.lead.regnRefCde;
    let dialogRef = this.dialog.open(LeadtimeEffDetailComponent, {
      data:{
        data:data,
        detailMode:DetailMode.ADD,
      },
      height: '80%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(o=>{
      this.page();
    });
  }
}


