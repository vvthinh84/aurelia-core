import { bindable, inject, customAttribute } from "aurelia-framework";
import * as $ from "jquery";

@customAttribute("checkbox_seman")
@inject(Element)
export class CheckboxSemantic {
    element:any;
    
    
    constructor(element) {
        this.element = element;
    }

    attached() {
        
        ($(this.element)as any).checkbox({
            })
            ;
    }
   
     
}