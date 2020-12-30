import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  searchQuery:string="";
  queryString = false;

  constructor() { }

  ngOnInit(): void {

  }

  onKey(event: any){
    this.searchQuery = event.target.value;
  }
  
  onClickSearch(){
    this.queryString = true;
  }

  onClickClear(){
    this.searchQuery = "";
    {{(<HTMLInputElement>document.getElementById('searchQuery')!).value=''}}
  }
}
