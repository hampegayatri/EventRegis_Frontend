import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss'],
})
export class ButtonComponent {
  @Input() configProperties: any;
  @Output() submitForm = new EventEmitter<any>();

  constructor() {}

  getCustomCssClasses() {
    let classes = '';
    if (
      this.configProperties.customCssClasses &&
      this.configProperties.customCssClasses.length > 0
    ) {
      classes = this.configProperties.customCssClasses.join(' ');
    }
    return classes;
  }

  onSubmitForm() {
    this.submitForm.emit();
  }
}
