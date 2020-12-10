import { NgModule } from '@angular/core';
import { UnixToDatePipe } from './unix-to-date.pipe';
import { TimesPipe } from './times.pipe';

@NgModule({
    declarations: [
        UnixToDatePipe,
        TimesPipe
    ],
    exports: [
        UnixToDatePipe,
        TimesPipe
    ]
})
export class PipesModule { }
