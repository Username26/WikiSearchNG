import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultlistService {

  private searchResults! : any;
  searchClicked : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addSearchResults(results: any){
    this.searchResults = results;
  }

  getSearchResults(){
    return this.searchResults;
  }

  constructor() { }
}
