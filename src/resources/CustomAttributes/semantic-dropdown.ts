import { bindable, inject, customAttribute } from "aurelia-framework";
import * as $ from "jquery";

@customAttribute("semantic_dropdown")
@inject(Element)
export class SemanticDropdown {
    element:any;
    
    
    constructor(element) {
        this.element = element;
    }

    attached() {
      
        ($(this.element)as any).dropdown({
            })
            ;
    }
   
     
}