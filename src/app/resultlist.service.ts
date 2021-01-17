import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultlistService {

  private searchResults! : Array<any>;
  searchClicked : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addSearchResults(results: Array<any>){
    this.searchResults = results;
  }

  getSearchResults(){
    return this.searchResults;
  }

  constructor() { }
}
