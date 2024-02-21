import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userdata: any;
  pro:string=''
  faEdit = faEdit;

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }
    
  getData(): void {
    const email = localStorage.getItem('email');
    this.userService.getUserData(email).subscribe(
      data => {
        console.log(data);
        this.userdata = data.user;
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any): void {
    const email: string = localStorage.getItem('email') || ''; 
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    this.http.post('http://localhost:3000/user/upload', formData).subscribe(
      (response: any) => {
        console.log('File uploaded successfully:', response);
        this.getData()
      },
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );
}


  logOut(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('crud')
    this.router.navigate(['/']);
  }
}
