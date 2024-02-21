import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
   title:string='LOGIN HERE...'
   email:string=''
   password:string=''
   constructor(private route:Router,private toast:ToastrService, private UserService:UserService){}

  postLogin(){
    if(this.email && this.password){
      this.UserService.checkUser(this.email,this.password).subscribe({
        next : response=>{
          if(response.message=='Email Not Registered'){
            this.toast.error('Email Not Registered','',{
              timeOut:5000
            })
          }else if(response.message=='Invalid Password'){
            this.toast.error('Invalid Password','',{
              timeOut:5000
            })
          }else{
            this.toast.success(response.message,'',{
              timeOut:5000
            })
            console.log(response.token);
            
            localStorage.setItem('crud',response.token)
            localStorage.setItem('email',this.email)
              this.route.navigate(['/home'])
            
          }
        },

        error : error=>{
          console.log(error);    
        }

      })
    }else{
      this.toast.error('All Fields Are Required','',{
        timeOut:5000
      })
    }
  }
  

   signUp(){
    this.route.navigate(['/register'])
   }

}
