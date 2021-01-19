import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Plural } from '@angular/common';
import { ResultsComponent } from '../results/results.component';
import { ResultlistService } from 'src/app/resultlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  searchQuery:string="";
  url = '/solr/wiki/select?indent=on&hl=on&hl.fl=content&defType=dismax&df=content&qf=id^20.0+content^2&hl.method=unified&hl.fragsize=0&q='

  constructor(private http: HttpClient, private searchResult: ResultlistService, private router: Router){ 
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
      this.searchResult.addSearchResults(data);
    }));
    // setTimeout(() => {console.log(this.searchResult.getSearchResults())}, 200 );
    setTimeout(() => {this.router.navigate(['/results'])}, 300)
    setTimeout(() => {this.searchResult.searchClicked.next(true)},300)
    
  }

}