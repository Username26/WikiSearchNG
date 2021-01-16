import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultlistService {

  private searchResults! : object;
  searchClicked : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addSearchResults(results: object){
    this.searchResults = results;
  }

  getSearchResults(){
    return this.searchResults;
  }

  constructor() { }
}
