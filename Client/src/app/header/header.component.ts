import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:String = ''

  constructor(private api:ApiService){}

  search(event:any){
    console.log(event.target.value)
    this.api.searchTerm.next(event.target.value)
  }

    ngOnInit(): void {
        this.token = sessionStorage.getItem('token') || ''
    }

    logout(){
      sessionStorage.removeItem('token')
    }
    
}
