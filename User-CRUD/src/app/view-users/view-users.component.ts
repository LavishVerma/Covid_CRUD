import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { UserAddService } from '../Services/user-add.service';

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
  Activation_status_options: string[]=['true','false'];
  userForm!: FormGroup;
  datebeforepipe!: Date;

  constructor(private fb: FormBuilder, private service: UserAddService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],  //First value is the initial value
      email: ['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      isvaccinated:['',],
      vaccinename:[''],
      noofdoses:['']
    });

    // this.service.GetAllUser().subscribe((list:any)=>{ 
    //   this.dataSource=list;
    //   console.log(this.dataSource); 
    // });
  }

  OnDelete(id:number){
    // this.service.DeleteUser(id).subscribe((data)=>{
    //   if(data){
    //     this.dataSource.filter((num : any)=>{
    //       return num!==id;
    //     });
    //   }
    //   this.ngOnInit();  
    // });
    
    // console.log(id);
  }

  OpenEditModal(user: User){
    // this.EditModalData=user;
    // this.EditForm.get('id')?.setValue(user.id);
    // this.EditForm.get('name')?.setValue(user.name);
    // this.EditForm.get('activation_status')?.setValue(user.activation_status);
    // this.datebeforepipe=user.birth_date;
    
    // this.EditForm.get('date_of_birth')?.setValue(this.datepipe.transform(user.birth_date,'mediumDate'));
    
    
  }
  
  OnSubmit(button: HTMLButtonElement ){
   
 
     } 
    
    
  

  getValue(name: string) {

    return this.userForm.get(name)?.value;
  }


}
