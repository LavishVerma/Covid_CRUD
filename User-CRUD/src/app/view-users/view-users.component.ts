import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { MatRadioChange } from '@angular/material/radio';
import { DialogService } from '../Services/dialog.service';
import { UserAddService } from '../Services/user-add.service';
import { SnackBarService } from '../Services/snack-bar.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDatasourceService } from '../Services/user-datasource.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  
@ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator;

  errorMessages={
    name :{required: 'Name is Required.',
           minlength: 'Minimum 3 characters required.',
           pattern : 'Only Alphabets allowed'},
    email    :{required: 'Email is Required.',
               pattern: ' Invalid Email Pattern.'},
    mobile    :{required: 'Mobile is Required.',
                length: ' Please Enter 10 digit Mobile.',
                pattern: ' Invalid Mobile Pattern.'}
   
    
    
  };
  length = -1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['No', 'Name', 'Email', 'Mobile','Vaccinated','Vaccine Name','Doses','Actions'];
  dataSource: User[]=[{email: "Lavishverma97@gmail.com",
  id: -1,
  isvaccinated: true,
  mobile: "7986301375",
  name: "Lavish",
  noofdoses: 1,
  vaccinename: "Covishield"}];
  EditModalData: User | undefined;
  editForm!: FormGroup;
  datebeforepipe!: Date;
  editrownumber!:number;
  isvaccinatedList:string[]=["Yes","No"];
  noofdosesList:string[]=["1","2"];
  editmode:Boolean=false;
  isvaccinatedflag:Boolean= false;
  vaccineNameList = ["Moderna","Sputnik","Covishield","Covaxine","Pfizer"];
  dialogvalue:Boolean=false;
  spinnerflag:Boolean=false;
  matDataSource!:  MatTableDataSource<User>;
  userDatasource!: UserDatasourceService;
  pageNumber!:number;
  constructor(private fb: FormBuilder,private snackbarService:SnackBarService, private userAddService: UserAddService,private dialogService: DialogService) { }

  ngAfterContentInit() {
    console.log(this.paginator.pageIndex  );
    
    console.log("ngAfterViewInit");
    this.matDataSource =  new MatTableDataSource(this.dataSource);
    this.userDatasource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadUsers())
      )
      .subscribe();
      console.log("Spin==",this.spinnerflag);
    
   }
  ngOnInit(): void {
    console.log("ngOninit");
    
    this.userAddService.setHeaderFlag(false);
    this.editForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],  //First value is the initial value
      email: ['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      isvaccinated:['',],
      vaccinename:[''],
      noofdoses:['']
    });
    this.spinnerflag = false;
    // this.userAddService.getAllUsers().subscribe((data:any)=>{
    //   this.dataSource = data;
    //   this.matDataSource =  new MatTableDataSource(this.dataSource);
    //   this.matDataSource.paginator = this.paginator;
    //   this.spinnerflag = true;
   
      
    // });
    
  
    this.userDatasource = new UserDatasourceService(this.userAddService);
    this.userDatasource.loading$.subscribe(flag=>this.spinnerflag);
    console.log("Spinner==",this.spinnerflag);
    
    this.userDatasource.loadUsers();
   // this.getServerData();
  }
  openDialog(){

  }

  OnDelete(id:number){
    console.log(id);
    
    this.dialogService.openDeleteDialog().afterClosed().subscribe(result=>{
      this.dialogvalue=result;
      console.log("===>Dialog response",this.dialogvalue);
      if(this.dialogvalue){
        this.userAddService.deleteUser(id).subscribe((response:any)=>{
         if(response)
         this.snackbarService.openSnackBar("Data deleted successfully","");
         console.log("Data deleted successfully",response?.message);
         this.loadUsers(); 
         
        });
      
        
      }
    });

  }

  public getServerDataDefault(){

    this.spinnerflag = false;
    this.userAddService.getUsersPaginationDefault().subscribe((response:any)=>{
      console.log("Response====",response);
      console.log("Paginator====",this.paginator);
      

      if(response){
        this.dataSource = response.content;
        this.length=response.totalElements;
        this.matDataSource.data= response.content;
        
       
        this.matDataSource.paginator = this.paginator;
        this.paginator.length = response.totalElements; 
        this.spinnerflag = true;
      }
      
      
    } );
    //return event;
  }
  public getServerData(){

   console.log(this.paginator.pageIndex, this.paginator.pageSize);
   
    this.spinnerflag = false;
    this.userAddService.getUsersPagination(this.paginator.pageIndex=0,this.paginator.pageSize=10).subscribe((response:any)=>{
      if(response){
        console.log(response);
        
        this.dataSource = response.content;
        this.length=response.totalElements;
        this.matDataSource.data= response.content;

       
        // this.matDataSource =  new MatTableDataSource(this.dataSource);
        this.matDataSource.paginator = this.paginator;
        console.log("LENGTH==",response.totalElements);
        
        this.paginator.length = response.totalElements; 
        this.spinnerflag = true;
      }
      
      
    } );
    //return event;
  }
  OpenEditModal(user: User){
    
    
    
  }
  
  OnSubmit( ){
   
 
     } 
    
  setEditMode(id:any,user:User){
    console.log(user);
    this.editmode = true;
    this.isvaccinatedflag=user.isvaccinated;
     this.editrownumber = id;

     this.editForm.get('name')?.setValue(user.name);
     this.editForm.get('email')?.setValue(user.email);
     this.editForm.get('mobile')?.setValue(user.mobile);
     this.editForm.get('isvaccinated')?.setValue(user.isvaccinated==true?"Yes":"No");
     this.editForm.get('vaccinename')?.setValue(user.vaccinename);
     this.editForm.get('noofdoses')?.setValue(user.noofdoses);
    
   
  } 
  disableEditMode(){
    this.editmode = false;
    this.editrownumber=0;
  }
  isEditMode(id:any){

    return (id == this.editrownumber);
  }
  
  chceckIsVaccinated(value:any){
    if(value == "Yes")
    this.isvaccinatedflag = true;
    if(value == "No")
    this.isvaccinatedflag = false;
  }

  getValue(name: string) {

    return this.editForm.get(name)?.value;
  }

  
  // ngOnInit() {
  //   this.userDatasource = new UserDatasourceService(this.userAddService);
  //   this.userDatasource.loadUsers();
  // }

  // ngAfterViewInit() {
  //   this.userDatasource.counter$
  //     .pipe(
  //       tap((count) => {
  //         this.paginator.length = count;
  //       })
  //     )
  //     .subscribe();

  //   this.paginator.page
  //     .pipe(
  //       tap(() => this.loadUsers())
  //     )
  //     .subscribe();
  // }

  loadUsers() {
    this.userDatasource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
    this.pageNumber = (this.paginator.pageIndex*this.paginator.pageSize)+1;
    console.log("Spin==",this.spinnerflag);
    console.log(this.paginator.pageIndex, " <---> ",this.paginator.pageSize);
    
    
  }


}
