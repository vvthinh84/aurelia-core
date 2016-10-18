import { bindable, inject, customAttribute } from 'aurelia-framework';
declare let $: JQueryStatic;
@inject(Element)
@customAttribute('bts_tooltip')

export class Tooltip {
    element: any;
    constructor(element) {
        this.element = element;
    }
    attached() {
        $(this.element).tooltip({ container: "body" });
    }

    detached() {
        $(this.element).tooltip('destroy');
    }
}
