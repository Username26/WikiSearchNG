import { Component, OnInit } from '@angular/core';
import { ResultlistService } from 'src/app/resultlist.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  constructor(private searchResults: ResultlistService) { }

  
  ngOnInit(): void {
    this.searchResults.searchClicked.subscribe( value => {
      if(value === true){
        console.log('hi');
      }
    })
  }

}
