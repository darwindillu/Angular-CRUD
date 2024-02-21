import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  title:string='WELCOME TO HOME PAGE'
  constructor(private http:HttpClient, private route:Router, private toast:ToastrService){}

  getProfile(){
    const token=localStorage.getItem('crud')
    console.log(token);
    
    if(token){
      this.route.navigate(['/profile'])
    }else{
      this.toast.error('Not Authorized','',{
        timeOut:5000
      })
      this.route.navigate(['/'])
    }
  }
}
