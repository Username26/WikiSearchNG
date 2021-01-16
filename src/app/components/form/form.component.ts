import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Plural } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  searchQuery:string="";
  url = '/solr/wiki/select?indent=on&defType=dismax&df=content&q=AKM&qf=id^20.0+content^2'

  constructor(private http: HttpClient){ 
    (this.http.get<any>(this.url).toPromise().then(data => {
      console.log(data)
    }));
  }

  ngOnInit(): void {
  }

  onKey(event: any){
    this.searchQuery += event.target.value + ' | ';
  }
}