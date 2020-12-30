import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  searchQuery:string="";

  constructor() { }

  ngOnInit(): void {

  }

  onKey(event: any){
    this.searchQuery += event.target.value + ' | ';
  }
}
