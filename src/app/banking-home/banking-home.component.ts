import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banking-home',
  templateUrl: './banking-home.component.html',
  styleUrls: ['./banking-home.component.css']
})
export class BankingHomeComponent implements OnInit {

  date!:number
  constructor() { }

  ngOnInit(): void {
    this.date=Date.now();
  }

}
