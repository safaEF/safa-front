import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '../classes/auth';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
      (user:User) => {
        // console.log(,user);
        
        Auth.user = user;
        Auth.userEmitter.emit(user);
        
        this.user = user;
      },
      () => this.router.navigate(['/login'])
    );
  }

}
