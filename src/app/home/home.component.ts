import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { from } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f') itemForm: NgForm;
  account: User = new User();
  userSub: Subscription;
  items;
  item1;
  // item2: Item;
  id;
  postMenu = false;
  // itemInput: Item;
  itemInput= {
    title: '',
    timeScheduled: new Date(),
    description: '',
    severity: '',
    daily: false,
    weekly: false,
    monthly: false,
    yearly: false,
  };


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
    this.id = (<HTMLInputElement>event.target).value;
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

  postIdMenu(){
    this.postMenu == true? this.postMenu = false : this.postMenu = true;
    console.log(this.postMenu)
  }
  
  submitData(){
    this.itemInput.title = this.itemForm.value.title;
    this.itemInput.description = this.itemForm.value.description;
    this.itemInput.timeScheduled = new Date(this.itemForm.value.time);
    this.itemInput.severity = this.itemForm.value.severity;
    let arr = this.itemForm.value.timeness
    console.log(arr);
    for (var index of arr ){
      console.log(index);
      if( index == "yearly"){
        this.itemInput.yearly = true;
      }
      if( index == "monthly"){
        this.itemInput.monthly = true;
      }
      if( index == "weekly"){
        this.itemInput.weekly = true;
      }
      if( index == "daily"){
        this.itemInput.daily = true;
      }  
    };
    
    

    console.log(this.itemForm);
    console.log(this.itemForm.value.timeness);
    console.log(this.itemInput.daily);
    console.log(this.itemInput.weekly);
    console.log(this.itemInput.monthly);
    console.log(this.itemInput.yearly);
    console.log(this.itemInput.severity)

    // this.item2.title = this.itemInput.title;
    // this.item2.description = this.itemInput.description;
    // this.item2.severity = this.itemInput.severity;
    // this.item2.timeScheduled =new Date(this.itemInput.timeScheduled);
    // this.item2.yearly = this.itemInput.yearly;
    // this.item2.monthly = this.itemInput.monthly;
    // this.item2.weekly = this.itemInput.weekly;
    // this.item2.daily = this.itemInput.daily;

    

    
    this.itemService.addItem(this.itemInput).subscribe(
      response => {
        this.items.push(response);
        // this.itemInput.reset();
        
      },
      error => {
        this.snackBar.open('Error adding Item', '', { duration: 3000 });
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
