import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApidataService } from 'src/app/core/services/apidata.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {

  constructor(
    private _ApiDataService: ApidataService,
    private _ActivatedRoute:ActivatedRoute,
  ) {
  }

  userDetails: any;
  userId: any;
  errorMsg: any;
  
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('id');
        this._ApiDataService.getUserDetails(this.userId).subscribe({
          next: (response) => {
            this.userDetails = response.data;
            

          },
          error: (error) => {
            this.errorMsg = error;
            console.log(this.errorMsg)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
}
