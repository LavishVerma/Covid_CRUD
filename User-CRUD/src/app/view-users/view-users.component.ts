import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { MatRadioChange } from '@angular/material/radio';
import { DialogService } from '../Services/dialog.service';
import { UserAddService } from '../Services/user-add.service';
import { SnackBarService } from '../Services/snack-bar.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

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
  constructor(private fb: FormBuilder,private snackbarService:SnackBarService, private userAddService: UserAddService,private dialogService: DialogService) { }

  ngOnInit(): void {
    this.userAddService.setHeaderFlag(false);
    this.editForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],  //First value is the initial value
      email: ['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      isvaccinated:['',],
      vaccinename:[''],
      noofdoses:['']
    });

    this.userAddService.getAllUsers().subscribe((data:any)=>{
      this.dataSource = data;
    });

    // this.service.GetAllUser().subscribe((list:any)=>{ 
    //   this.dataSource=list;
    //   console.log(this.dataSource); 
    // });
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
         this.ngOnInit();  
         
        });
      
        
      }
    });
   
    
    
      
   
    
    // console.log(id);a
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
    console.log("THis.Flag===>",this.isvaccinatedflag);
    console.log("value",value);
    if(value == "Yes")
    this.isvaccinatedflag = true;
    if(value == "No")
    this.isvaccinatedflag = false;
    console.log("THis.Flag===>",this.isvaccinatedflag);
  }

  getValue(name: string) {

    return this.editForm.get(name)?.value;
  }


}
