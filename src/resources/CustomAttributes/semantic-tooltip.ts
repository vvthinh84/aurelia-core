import { bindable, inject, customAttribute } from "aurelia-framework";
import * as $ from "jquery";

@customAttribute("senam_tooltip")
@inject(Element)
export class TooltipSeman {
    element:any;
    @bindable title: any;
    @bindable placement: any
    
    constructor(element) {
        this.element = element;
    }

    attached() {
        ($(this.element)as any).popup({
            })
            ;
    }
   
      detached() {
        ($(this.element)as any).popup({observeChanges:true});
    }
}