import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultlistService {

  private searchResults! : object;

  addSearchResults(results: object){
    this.searchResults = results;
  }

  getSearchResults(){
    return this.searchResults;
  }

  constructor() { }
}
