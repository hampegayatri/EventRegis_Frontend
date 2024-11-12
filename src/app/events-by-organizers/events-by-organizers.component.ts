import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'events-by-organizers',
  templateUrl: './events-by-organizers.component.html',
  styleUrls: ['./events-by-organizers.component.scss'],
})
export class EventsByOrganizersComponent implements OnInit {
  public cardConfigProperties570bed759261: any;
  public datepickerConfigPropertiesd2648c03b94d: any;
  public datepickerFormValidationd2648c03b94d: any;
  public buttonConfigPropertiesb9a117bde43a: any;

  constructor() {}

  ngOnInit() {
    this.cardConfigProperties570bed759261 = {
      helpText: '',
      styles: { stylesClassName: '', labelStylesClassName: '' },
      isHidden: false,
      propertyName: 'cd45bd03-81b6-4e75-82c0-570bed759261',
      showLabel: false,
      type: 'card',
      formControlName: '',
      navigateTo: '',
      staticFn: [],
      customCssClasses: ['my-1'],
      childs: [
        {
          componentId: 13,
          componentName: 'Date Picker 1',
          listChilds: [],
          styleType: '',
          mobileFloatAlignment: '',
          childs: [],
          displayName: 'Select Date',
          icon: 'faCalendar',
          componentType: 'Advanced Input Fields',
          showLabel: true,
          validations: [
            { validationType: 'readonly', required: false },
            { validationType: 'mandatory', required: true },
          ],
          propertyName: '85cbbe3c-f5de-4b9f-83a7-d2648c03b94d',
          newProperty: true,
          hasChildEntity: false,
          hasPlaceholder: 'Date picker',
          type: 'date-picker',
          placeHolder: 'Date picker',
          sortOrder: 101010,
          value: '2024-09-27T11:29:33.717Z',
          isActive: false,
          customCssClasses: ['my-1'],
          note: '',
          isHidden: false,
          isImplemented: true,
          styles: {},
          labelStyles: {
            textAlign: 'left',
            fontSize: '16px',
            fontWeight: '500',
            color: '#000000',
          },
          helpText: '',
          navigateTo: '',
          formControlName: '',
          templatePropertyId: 1,
          dateFormat: 'MM/DD/YYYY',
          isDataStoredInSession: false,
          fieldStorageKeyValue: '',
          mapValuesFromProperty: '',
          index: 0,
        },
        {
          componentId: 10,
          componentName: 'Button 6',
          listChilds: [],
          styleType: '',
          mobileFloatAlignment: '',
          childs: [],
          icon: 'faRectangleLandscape',
          componentType: 'Basic Input Fields',
          showLabel: false,
          propertyName: 'de7464ed-41c2-4060-bf91-b9a117bde43a',
          newProperty: true,
          hasChildEntity: false,
          hasPlaceholder: false,
          type: 'button',
          sortOrder: 101020,
          btnClass: 'btn-primary',
          btnText: 'Export eventsByOrganizer',
          value: null,
          isActive: false,
          btnType: 'button',
          dynamicFn: [],
          staticFn: [],
          customCssClasses: ['my-1'],
          note: '',
          isHidden: false,
          isImplemented: true,
          styles: {
            position: 'relative',
            top: '',
            right: '',
            bottom: '',
            left: '',
            zIndex: '',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000000',
            borderRadius: '4px',
            bgColor: 'rgb(28, 151, 222, 1)',
          },
          labelStyles: {},
          helpText: '',
          navigateTo: '',
          formControlName: 'button6',
          templatePropertyId: 2,
          isDataStoredInSession: false,
          fieldStorageKeyValue: '',
          mapValuesFromProperty: '',
          defaultState: '',
          index: 1,
        },
      ],
      icon: 'faIdCard',
      listChilds: [],
      styleType: '',
      variableName: 'cardConfigProperties570bed759261',
    };
    this.datepickerConfigPropertiesd2648c03b94d = {
      helpText: '',
      styles: {
        stylesClassName: '',
        labelStylesClassName:
          'text-align-left font-size-16 font-weight-500 color-000000',
      },
      isHidden: false,
      propertyName: '85cbbe3c-f5de-4b9f-83a7-d2648c03b94d',
      showLabel: true,
      displayName: 'Select Date',
      type: 'date-picker',
      value: '2024-09-27T11:29:33.717Z',
      placeHolder: 'Date picker',
      formControlName: '',
      navigateTo: '',
      customCssClasses: ['my-1'],
      childs: [],
      icon: 'faCalendar',
      listChilds: [],
      dateFormat: 'MM/DD/YYYY',
      styleType: '',
      variableName: 'datepickerConfigPropertiesd2648c03b94d',
    };
    this.datepickerFormValidationd2648c03b94d = {
      validations: [
        { validationType: 'readonly', required: false },
        { validationType: 'mandatory', required: true },
      ],
    };
    this.buttonConfigPropertiesb9a117bde43a = {
      helpText: '',
      styles: {
        stylesClassName:
          'position-relative top-none right-none bottom-none left-none z-index-none border-width-1 border-style-solid border-color-000000 border-radius-4 background-color-rgb28-151-222-1',
        labelStylesClassName: '',
      },
      isHidden: false,
      propertyName: 'de7464ed-41c2-4060-bf91-b9a117bde43a',
      showLabel: false,
      type: 'button',
      formControlName: 'button6',
      btnText: 'Export eventsByOrganizer',
      btnType: 'button',
      navigateTo: '',
      staticFn: [],
      customCssClasses: ['my-1'],
      childs: [],
      icon: 'faRectangleLandscape',
      listChilds: [],
      styleType: '',
      variableName: 'buttonConfigPropertiesb9a117bde43a',
    };
  }

  datepickerChangedd2648c03b94d(event: any) {
    this.datepickerConfigPropertiesd2648c03b94d = event;
  }
  submitFormb9a117bde43a() {}
}
