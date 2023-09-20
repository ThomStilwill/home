import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { ActivatorService } from './services/activator.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
import { HttpService } from './services/http.service';

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
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
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
            MinusToParensPipe,
            InputTextComponent,
            InputSelectComponent,
            InputDateComponent,
            ValidationMessagesComponent,
            AlertComponent,
            GridComponent,
            DialogComponent,
            FormComponent,
            CommonModule
          ]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
     // throw new Error('Shared Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
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
