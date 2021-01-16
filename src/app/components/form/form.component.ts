import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Plural } from '@angular/common';
import { ResultsComponent } from '../results/results.component';
import { ResultlistService } from 'src/app/resultlist.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  searchQuery:string="";
  url = '/solr/wiki/select?indent=on&defType=dismax&df=content&qf=id^20.0+content^2&q='

  constructor(private http: HttpClient, private searchResult: ResultlistService){ 
  }

  ngOnInit(): void {
  }

  onKey(event: any){
    this.searchQuery = event.target.value;
  }

  onSearch(){
    // (this.http.get<any>(this.url + this.searchQuery).toPromise().then(data => {
    //   console.log(data.response.docs[0].)
    // }));
    (this.http.get<any>(this.url + this.searchQuery).toPromise().then(data => {
      this.searchResult.addSearchResults(data.response.docs);
    }));
    console.log(this.searchResult.getSearchResults());
    
  }

}