import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder , private api:ApiService , private router:Router){}
  // form builder has three parts: group , array and control
  registerForm = this.fb.group({ //group
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]], //array
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  // control passes through the html
  
  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password

      const user = {username,email,password}

      this.api.register(user).subscribe({
        next:(response:any)=>{
          alert('Register Success')
          this.router.navigateByUrl('/user/login')
        },        error:(data:any)=>{
          alert(data.error)
        }
      })

    }else{
      alert('Invalid Form');
    }

    // this.toastr.showSuccess("Register Success")
  }
}