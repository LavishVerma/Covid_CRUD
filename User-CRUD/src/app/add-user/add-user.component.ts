import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  hide = true;
  selectedVaccineName : string = "";
  vaccineName = ["Moderna","Sputnik","Covishield","Covaxine"] 
  constructor() { 
   
  }

  ngOnInit(): void {
  }

}
