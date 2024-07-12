import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tostService: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      code: [''],
      password: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login({
        code: this.f.code.value,
        password: this.f.password.value,
      })
      .subscribe((success) => {
        if (success) {
          const userData = JSON.parse(localStorage.getItem('userInfo'));
          this.tostService.success('بەخێربێیت');

          if (userData.role === 'customer') {
            this.router.navigate(['/Main/MyRquest/customer/0/30/-createdAt']);
          } else if (userData.role === 'admin') {
            this.router.navigate(['/Main/listItem/0/30/-createdAt']);
          } else if (userData.role === 'employ-china') {
            this.router.navigate(['/Main/BoughtRequest/0/30/-createdAt']);
          } else {
            // lera route customer dabne
            this.router.navigate(['/Main']);
          }
        } else {
          /* this.tostService.error('دڵنیا بەرەوە لە کۆد و پاسۆردەکەت'); */
        }
      });
  }
  getdata() {
    let authorizationData = 'Basic ' + btoa('fancynet:fancy@@1111');

    /*   const headerOptions:any = {
               headers: new HttpHeaders({  
                .set()  'Content-Type':  'application/json',
                'Authorization':  authorizationData
          })
      }; */

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('username:password'),
      }),
    };

    this.http
      .request('GET', 'https://185.187.204.34/rest/ip/address', {
        headers: httpOptions,
      })
      .subscribe((res) => {});
  }
}
