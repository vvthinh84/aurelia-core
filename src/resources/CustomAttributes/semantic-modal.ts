import { bindable, inject, customAttribute } from "aurelia-framework";
import * as $ from "jquery";

@customAttribute("semantic_modal")
@inject(Element)
export class SemanticModal {
    element:any;
    @bindable title: any;
    @bindable placement: any
    
    constructor(element) {
        this.element = element;
    }

    attached() {
        console.log('this',this.element);
         ($('#logIn')as any).click(function(){
        ($('.ui.modal') as any).modal('show');    
     });
    }
   
     
}
