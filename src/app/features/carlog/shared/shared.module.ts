import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { ActivatorService } from './services/activator.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
import { HttpService } from './services/http.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit, faPlusCircle, faCopy, faCheckSquare, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import {NgxMaskModule} from 'ngx-mask-2';

import { MinusToParensPipe } from './minustoparens.pipe';

import { ValidationMessagesComponent } from './components/validation-messages.component';
import { InputTextComponent } from './components/input-text.component';
import { InputSelectComponent } from './components/input-select.component';
import { InputDateComponent } from './components/input-date.component';
import { Helper } from './services/helper.service';
import { Utilities } from './utilities';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { GridComponent } from './grid/grid.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { MouseWheelDirective } from './directives/mouse-wheel.directive';
import { PagerComponent } from './pager/pager.component';
import { ControlStatusComponent } from './components/control-status.component';
import { FormComponent } from './components/form/form.component';
import { DebugService } from './services/debug.service';

// Add an icon to the library for convenient access in other components
library.add(faTrash, faEdit, faPlusCircle, faCopy, faCheckSquare, faSortUp, faSortDown, faSort);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ModalService,
              ActivatorService,
              LoadingService,
              HttpService,
              AlertService,
              DialogService,
              Helper,
              Utilities],
  declarations: [ModalComponent,
                 LoadingComponent,
                 MinusToParensPipe,
                 InputTextComponent,
                 InputSelectComponent,
                 InputDateComponent,
                 ValidationMessagesComponent,
                 AlertComponent,
                 GridComponent,
                 DialogComponent,
                 MouseWheelDirective,
                 PagerComponent,
                 ControlStatusComponent,
                 FormComponent
                 ],
  exports: [ModalComponent,
            LoadingComponent,
            FontAwesomeModule,
            MinusToParensPipe,
            InputTextComponent,
            InputSelectComponent,
            InputDateComponent,
            ValidationMessagesComponent,
            AlertComponent,
            GridComponent,
            DialogComponent,
            FormComponent
          ]
})
export class SharedModule {

  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
     // throw new Error('Shared Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ ModalService,
                   ActivatorService,
                   LoadingService,
                   HttpService,
                   AlertService,
                   DialogService,
                   DebugService,
                   Helper,
                   Utilities ]
    };
  }
 }
