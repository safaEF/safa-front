import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css']
})

export class LoginComponent implements OnInit {
  alert_success: boolean=false
  alert_danger: boolean=false
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

   submit(): void {
   this.authService.login(this.form.getRawValue())


      .subscribe(() =>  {
        // if login success do this

        this.alert_success=true,
        setTimeout(()=>this.router.navigate(['/']),1000);

      },

      // else do this
      (error) => {
        this.alert_danger=true
      });
      // empty sign in form
      this.form.reset({})

    }
     // end of function
   closeAlert()
   {
    this.alert_success=false
   }
   closeAlertDanger()
   {
    this.alert_danger=false
   }
  }
