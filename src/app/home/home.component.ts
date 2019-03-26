import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;
  items;
  item1;
  id: number = 0;


  constructor(private global: GlobalService, private router: Router,
    private itemService: ItemService, private fb: FormBuilder,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userSub = this.global.user.subscribe(
      me => this.account = me
    );
    if ( localStorage.getItem('token') && localStorage.getItem('account')) {
      this.global.me = JSON.parse(localStorage.getItem('account'));
      // this.getid();
    } else {
      this.router.navigate(['/login']);
    }

  }

  onInputUpdate(event: Event){
    this.id = event.target.value;
    console.log(this.id);
  }

  getid(){
    this.itemService.getItem(this.id).subscribe(
      response => {
        this.item1 = response;
      },
      error => {
        this.snackBar.open('Error getting Items', '', { duration: 3000 });
      }
    );
  }

  getids(){
    this.itemService.getItems().subscribe(
      response => {
        this.items = response;
      },
      error => {
        this.snackBar.open('Error getting Items', '', { duration: 3000 });
      }
    );
  }
  
  logoutClicked() {
    this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.router.navigate(['/login']);
  }

}
