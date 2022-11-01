import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  sortedData: Role[];
  
  constructor(private roleService: RoleService) {
    this.sortedData = this.roles.slice();
  }
  load(){
  this.roleService.all().subscribe(    
    roles => {
           
    this.roles = roles.data}
  );
    }
  

  ngOnInit(): void {
    console.log(this.roles);
    
    this.load()
    
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.roleService.delete(id).subscribe(
        () => this.roles = this.roles.filter(r => r.id !== id)
      );
    }
  }

  sortData(sort: Sort) {
    const data = this.roles.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  
}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
