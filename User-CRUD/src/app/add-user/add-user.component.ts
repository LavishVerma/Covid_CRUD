import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  hide = false;
  hidden:boolean = false;
  selectedVaccineName : string = "";
  vaccineName = ["Moderna","Sputnik","Covishield","Covaxine"] 
  constructor() { 
   
  }

  ngOnInit(): void {
  }

  radioChange($event: MatRadioChange) {
  
    console.log($event.source.name, $event.value);
    this.hidden = ($event.value == "Yes") ? true : false;
  
}
}
