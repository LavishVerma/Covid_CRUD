import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserAddService } from '../Services/user-add.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
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
  hide = false;
  usermodel: User = new User();
  selectedisvaccinatedvalue:boolean= false;
  userForm!: FormGroup;
  vaccineName = ["Moderna","Sputnik","Covishield","Covaxine","Pfizer"] 
  constructor(private fb: FormBuilder,private  service:UserAddService, private router: Router) { 
    
  }
  
  ngOnInit(): void {
    this.service.setHeaderFlag(true);
    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],  //First value is the initial value
      email: ['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      isvaccinated:['',],
      vaccinename:[''],
      noofdoses:['']
    });
  }
  
  isVaccinatedChange(event: MatRadioChange) {
    
    this.selectedisvaccinatedvalue = (event.value == "Yes") ? true : false;
    this.userForm.get('isvaccinated')?.setValue(this.selectedisvaccinatedvalue);
  }

  noOfDosesChange(event: MatRadioChange){
    this.userForm.get('noofdoses')?.setValue(event.value);
  }

  vaccineNameChange(event: MatSelectChange){
    console.log("====>",event.value);
    this.userForm.get('vaccinename')?.setValue(event.value);
    
    
    
  }
  
  OnSubmit(){
  this.saveDataInModel();
    console.log(this.usermodel);
    
   this.service.saveUser(this.usermodel).subscribe((response)=>{
     console.log('Response recieved==>',response);
     if(response){
      
      this.router.navigate(['view']);
     }
   });
    
   
    
  }

  saveDataInModel() {
    this.usermodel={
      id : -1,
      name : this.getValue('name'),
      email : this.getValue('email'),
      mobile : this.getValue('mobile'),
      isvaccinated: this.getValue('isvaccinated'),
      vaccinename:this.getValue('vaccinename'),
      noofdoses:this.getValue('noofdoses')
    };

  }

  getValue(value:string) {
    return this.userForm.get(value)?.value;
  }
}


