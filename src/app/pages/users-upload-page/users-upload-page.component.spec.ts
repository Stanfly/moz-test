import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUploadPageComponent } from './users-upload-page.component';

describe('UsersUploadPageComponent', () => {
  let component: UsersUploadPageComponent;
  let fixture: ComponentFixture<UsersUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersUploadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
