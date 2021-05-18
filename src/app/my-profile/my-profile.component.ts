import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  

  myProfileData: any;
  arrayOfKeys: any;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.restService.getLoggedInPersonData().subscribe((response) => {
      this.myProfileData = response;
      console.log(this.myProfileData);
      this.arrayOfKeys = Object.keys(this.myProfileData[0]);
    });
  }

  


  
  
  
  

}
