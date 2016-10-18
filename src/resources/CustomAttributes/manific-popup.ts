import {bindable, inject, customAttribute} from 'aurelia-framework';
declare let $: JQueryStatic;
import 'magnificPopup';
@inject(Element)
@customAttribute('manific')

export class Select2CustomAttribute {
  element:any;
  constructor(element) {
    this.element = element;
    
  }
  attached() {
    ( $(this.element) as any ).magnificPopup({type:'image'});
  }

  detached() {
    
  }
  
}
