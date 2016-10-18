import { bindable, inject, customAttribute } from "aurelia-framework";
import * as $ from "jquery";

@customAttribute("semantic_rating")
@inject(Element)
export class SemanticRating {
    element:any;
    
    
    constructor(element) {
        this.element = element;
    }

    attached() {
        
        ($(this.element)as any).rating({
            })
            ;
    }
   
     
}