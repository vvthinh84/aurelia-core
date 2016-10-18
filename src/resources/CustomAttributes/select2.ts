import {bindable, inject, customAttribute} from 'aurelia-framework';
declare let $: JQueryStatic;
import 'select2';
@inject(Element)
@customAttribute('select2')

export class Select2CustomAttribute {
  element:any;
  constructor(element) {
    this.element = element;
    
  }
  attached() {
    $(this.element).select2( (this as any).value)
      .on('change', () => this.element.dispatchEvent(new Event('change')));
  }

  detached() {
    $(this.element).select2('destroy');
  }
  
}
