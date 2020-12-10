import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from 'src/app/components/modals/add-user-modal/add-user-modal.component';
import { UsersService } from 'src/app/services/users.service';
import { User as _User, UserFilterParams } from 'src/app/shared/interfaces';

interface User extends _User {
  selected?: boolean
}

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListPageComponent implements OnInit {
  loading = true;
  currentPage = 1;
  pagesCount = 1;
  userList: User[] = [];
  selectedUsers: User[] = [];
  filters: UserFilterParams = {};
  error: string = '';

  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsersList();
  }

  loadUsersList() {
    this.loading = true;
    this.cdr.detectChanges();
    this.usersService.getUsers(this.filters, this.currentPage)
      .subscribe(response => {
        this.userList = response.users;
        this.pagesCount = response.pagesCount;
        this.loading = false;
        this.cdr.detectChanges();
      }, error => {
        this.error = 'Ошибка сервера';
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  applyFilters() {
    this.currentPage = 1;
    this.loadUsersList();
  }


  selectUser(user: User) {
    user.selected = !user.selected;
    this.cdr.detectChanges();
  }

  nextPage() {
    this.currentPage = this.currentPage >= this.pagesCount ? this.pagesCount : (this.currentPage + 1);
    this.loadUsersList();
  }
  prevPage() {
    this.currentPage = this.currentPage <= 1 ? 1 : (this.currentPage - 1);
    this.loadUsersList();
  }

  goToPage(newPage: number) {
    if (newPage >= 1 || newPage <= this.pagesCount) {
      this.currentPage = newPage;
      this.loadUsersList();
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsersList();
      }
    });
  }

}
