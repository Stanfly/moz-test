import { NgModule } from '@angular/core';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddUserModalComponent
    ],
    exports: [
        AddUserModalComponent
    ]
})
export class ModalsModule { }
