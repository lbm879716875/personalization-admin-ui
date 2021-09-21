import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaticService } from '../admin/api/static.service';
import { PersDiscDesc } from '../entity/PersDiscDesc';
import { SortDirection } from '../model/Constants';
import { PagedEntity } from '../model/PagedEntity';
import { dbRegionDisplayMap } from '../model/Constants';
import { RegionDropDown } from '../dropdown/Region';
import { openConfirmationDialog } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit ,AfterViewInit{
  dataSource:any;
  dbRegionMap=dbRegionDisplayMap;
  displayedColumns: string[] = ['discTag','region','statcDesc','statcDescC','statcDescCZhs','invntCount','actions'];
  ELEMENT_DATA: PersDiscDesc[] = [];
  @ViewChild(RegionDropDown) regionDropDown!:RegionDropDown;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  
  constructor(staticService:StaticService,private http:HttpClient,private route:Router,private snackBar:MatSnackBar,public dialog: MatDialog) {
  
  
  }
  

  async ngOnInit(){
    await this.getList(undefined,undefined,undefined,0,10);
    this.dataSource.paginator=this.paginator;
  }

  ngAfterViewInit(): void {
    
  }

  page(){
    this.getList(this.regionDropDown.region,
      undefined,undefined,
      this.paginator.pageIndex,
      this.paginator.pageSize
      );
  }

  reload(){
    this.paginator.pageIndex=0;
    this.page();
    this.snackBar.open("reload successfully");
  }

  add(){
    this.route.navigate(['promotion/add']);
  }

  updateRow(row:any){
    var data:PersDiscDesc = row as PersDiscDesc;
    this.route.navigate(['promotion/update/'+data.discTag],{state:{data:data}});
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
    var data:PersDiscDesc = row as PersDiscDesc; 
    this.http.delete<any>("apis/disc-desc/"+data.discTag+"?db="+data.db).subscribe(res=>{
      this.snackBar.open("delete successfully");
      this.reload();
    });
  }

  updateInventory(row:any){
    var data:PersDiscDesc = row as PersDiscDesc;
    this.route.navigate(['promotion/'+data.discTag+'/inventory'],{state:{db:data.db}});
  }



  async getList(region?:String,sortBy?:string[],sortDirection?:SortDirection[],pageNo?:number,pageSize?:number){
    var conditions="?";
    if(region!=null)
        conditions+="region="+region+"&";
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
  await this.http.get('/apis/disc-descs' + conditions).toPromise()
    .then(data=>{
      let res :PagedEntity<PersDiscDesc> = data as PagedEntity<PersDiscDesc>;
      this.ELEMENT_DATA = res.list;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      setTimeout(() =>{
        this.paginator.length=res.totalCount;
      },100);
    }).finally(()=>{
     
    })
    .catch(err=>{
      console.log(err)
    });
  }
}
