import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PersInvntDisc } from '../entity/PersInvntDisc';
import { SortDirection } from '../model/Constants';
import { PagedEntity } from '../model/PagedEntity';
import { DatePipe } from '@angular/common';
import { codeToRegionMap } from '../model/Constants';
import { openConfirmationDialog } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-promotion-inventory',
  templateUrl: './promotion-inventory.component.html',
  styleUrls: ['./promotion-inventory.component.css']
})
export class PromotionInventoryComponent implements OnInit {
  db:string='';
  discTag:string='';
  codeToRegionMap=codeToRegionMap;
  dataSource:any;
  displayedColumns: string[] = ['invntId','region','discTag', 'startDte', 'endDte','actions'];
  
  ELEMENT_DATA: PersInvntDisc[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar,private datePipe: DatePipe,public dialog: MatDialog) {
    route.params.subscribe(res=>{
      this.discTag=res.discTag;
    });
    this.db = history.state.db;
   }

  async ngOnInit(){
    await this.getList(undefined,undefined,0,10);
    this.dataSource.paginator=this.paginator;
  }

  page(){
    this.getList(
      undefined,undefined,
      this.paginator.pageIndex,
      this.paginator.pageSize
      );
  }

  updateRow(row:any){
    var data:PersInvntDisc = row as PersInvntDisc;
    this.router.navigate(['promotion/'+data.discTag+'/inventory/update'],{state:{data:data,db:this.db}});
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
    var data:PersInvntDisc = row as PersInvntDisc;
    let condition="db="+this.db+"&invntId="+data.invntId+"&regnRefCde="+data.regnRefCde+"&discTag="+data.discTag+"&startDte="+this.datePipe.transform(data.startDte,"yyyy-MM-dd");
    console.log(condition)
    this.http.delete<any>("apis/invnt-disc?"+condition).subscribe(res=>{
      this.snackBar.open("delete successfully");
      this.reload();
    });
  }

  add(){
    this.router.navigate(['promotion/'+this.discTag+'/inventory/add'],{state:{db:this.db}});
  }

  reload(){
    this.paginator.pageIndex=0;
    this.page();
    this.snackBar.open("reload successfully");
  }

  clearAll(){
    this.http.delete('/apis/invnt-disc/'+this.discTag+"?db="+this.db).subscribe(res=>{
      this.snackBar.open("delete successfully");
      this.reload();
    });
  }

  clearAllConfirmation(){
    let dialogRef=openConfirmationDialog(this.dialog,'Are you sure you want to clear all?');
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.clearAll();
      }
    });
  }

  async getList(sortBy?:string[],sortDirection?:SortDirection[],pageNo?:number,pageSize?:number){
    var conditions="";
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

  await this.http.get('/apis/invnt-disc/' + this.discTag+'?db='+this.db+"&"+conditions).toPromise()
    .then(data=>{
      let res :PagedEntity<PersInvntDisc> = data as PagedEntity<PersInvntDisc>;
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
