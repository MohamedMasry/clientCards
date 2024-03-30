import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/core/services/apidata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _ApiDataService: ApidataService,
  ) {
  }
  usersData: any;
  allUsers:any;
  usersTotal: any = 12;
  currentPage: number = 1;
  numberOfPages: number[] = [];

  ngOnInit(): void {

    this.getUsersByPage(this.currentPage);

    this._ApiDataService.getAllUsers(this.usersTotal).subscribe({
      next: (response) => {
        this.allUsers = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  getUsersByPage(currentPage: number) {
    this.currentPage = currentPage;
    this._ApiDataService.getUsersByPage(currentPage).subscribe({
      next: (response) => {
        this.usersData = response.data;
        this.usersTotal = response.total;
        if (this.numberOfPages.length == 0) {
          for (let number = 1; number <= response.total_pages; number++) {
            this.numberOfPages.push(number)
          }
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }



  searchById(search:HTMLInputElement) {

    if(search.value.length>0){
      this.usersData = this.allUsers?.filter((user: any) => user.id == search.value)
    }
    else{
      this.getUsersByPage(this.currentPage);
    }
    
  }

}
