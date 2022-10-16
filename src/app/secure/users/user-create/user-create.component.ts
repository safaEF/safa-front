import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../interfaces/role';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
      password:''
    });

    this.roleService.all().subscribe(
     
      
      (roles:any) => this.roles = roles.data
    );
  }

  submit(): void {
    console.log(this.form.getRawValue());
    
    this.userService.create(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}