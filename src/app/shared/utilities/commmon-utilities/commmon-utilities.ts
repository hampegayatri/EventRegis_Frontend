import { Component, Directive, Input, TemplateRef } from '@angular/core';
export interface BlockableUI {
  getBlockableElement(): HTMLElement;
}

@Component({
  selector: 'p-header',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class Header {}

@Component({
  selector: 'p-footer',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class Footer {}

@Directive({
  selector: '[pTemplate]',
  standalone: true,
  host: {},
})
export class ProjectionTemplate {
  @Input() type: string | undefined;

  @Input('pTemplate') name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }
}
