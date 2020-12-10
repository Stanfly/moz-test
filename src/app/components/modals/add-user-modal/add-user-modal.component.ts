import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  userForm = new FormGroup({
    registeredAt: new FormControl('', Validators.required),
    fio: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })
  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddUserModalComponent>
  ) { }

  ngOnInit(): void {
  }
  submitForm() {
    let user = this.userForm.value;
    user.registeredAt = user.registeredAt.getTime();
    console.log(user);
    this.usersService.addUser(user).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
