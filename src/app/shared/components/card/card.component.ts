import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  TemplateRef,
  ContentChildren,
  ContentChild,
  QueryList,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';
import {} from '@angular/forms';
import {
  BlockableUI,
  Footer,
  Header,
  ProjectionTemplate,
} from '../../utilities/commmon-utilities/commmon-utilities';
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit, AfterContentInit, BlockableUI {
  @Input() configProperties: any;
  @Output() configPropertiesChanged = new EventEmitter<string>();
  @Input() header: string | undefined;
  @Input() subheader: string | undefined;
  @Input() helpText: string = '';
  @Input() isHidden: boolean | undefined;
  @Input() elementFormControlName: string = '';
  @Input() customCssClasses: string[] | undefined;
  @Input() navigateTo: string = '';
  @Input()
  set style(value: { [klass: string]: any } | null | undefined) {
    if (!this.equals(this._style, value)) {
      this._style = value;
    }
  }

  get style(): { [klass: string]: any } | null | undefined {
    return this._style;
  }

  private equals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  @Input() styleClass: string | undefined;

  @ContentChild(Header) headerFacet: TemplateRef<any> | undefined;

  @ContentChild(Footer) footerFacet: TemplateRef<any> | undefined;

  @ContentChildren(ProjectionTemplate) templates:
    | QueryList<ProjectionTemplate>
    | undefined;

  headerTemplate: TemplateRef<any> | undefined;

  titleTemplate: TemplateRef<any> | undefined;

  subtitleTemplate: TemplateRef<any> | undefined;

  contentTemplate: TemplateRef<any> | undefined;

  footerTemplate: TemplateRef<any> | undefined;
  _style: { [klass: string]: any } | null | undefined = null;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.helpText = this.helpText || this?.configProperties?.helpText || '';
    this.isHidden =
      this.isHidden !== undefined
        ? this.isHidden
        : this?.configProperties?.isHidden;
    this.customCssClasses =
      this.customCssClasses || this?.configProperties?.customCssClasses || [];
    this.navigateTo =
      this.navigateTo || this?.configProperties?.navigateTo || '';
    this.elementFormControlName =
      this.elementFormControlName ||
      this?.configProperties?.formControlName ||
      '';
    this.styleClass =
      this.styleClass || this?.configProperties?.styles?.stylesClassName || '';
  }
  getCustomCssClasses() {
    let classes = '';
    if (this.customCssClasses && this.customCssClasses.length > 0) {
      classes = this.customCssClasses.join(' ');
    }
    return classes;
  }

  navigateToAnotherPage() {}

  ngAfterContentInit() {
    (this.templates as QueryList<ProjectionTemplate>).forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'title':
          this.titleTemplate = item.template;
          break;

        case 'subtitle':
          this.subtitleTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }
  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }
}
