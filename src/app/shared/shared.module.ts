import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskDirective } from './directives/text-mask.directive';
import { FormatNumberDirective } from './directives/number.directive';
import { ValidationsComponent } from './components/validations/validations.component'
import { InputTextComponent } from './components/form/input-text.component';
import { InputSelectComponent } from './components/form/input-select.component';

@NgModule({
  declarations: [
    TextMaskDirective,
    FormatNumberDirective,
    ValidationsComponent,
    InputTextComponent,
    InputSelectComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    TextMaskDirective,
    FormatNumberDirective,
    ValidationsComponent,
    InputTextComponent,
    InputSelectComponent
  ]
})
export class SharedModule {

  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('Shared Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ ]
    };
  }
 }
