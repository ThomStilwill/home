import { Injectable } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Injectable()
export class ActivatorService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
    ) {
  }

  create <T>(viewcontainer: ViewContainerRef, component: any): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<T>(component);
    const componentref = viewcontainer.createComponent(componentFactory);
    return componentref;
  }
}
