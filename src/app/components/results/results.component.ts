import { Component, OnInit } from '@angular/core';
import { ResultlistService } from 'src/app/resultlist.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  JSON;
  data!: Array<any>;
  constructor(private searchResults: ResultlistService) {
    this.JSON = JSON;
  }

  
  ngOnInit(): void {
    this.searchResults.searchClicked.subscribe( value => {
      if (value === true) {
        this.data = this.searchResults.getSearchResults();
        console.log(this.data);
      }
    })
  }

}
