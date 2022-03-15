import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskDirective } from './directives/text-mask.directive';
import { FormatNumberDirective } from './directives/number.directive';
import { ValidationsComponent } from './components/validations/validations.component'

@NgModule({
  declarations: [TextMaskDirective, FormatNumberDirective, ValidationsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    TextMaskDirective,
    FormatNumberDirective,
    ValidationsComponent
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
