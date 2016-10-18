import { bindable, inject, customElement } from 'aurelia-framework';
import { selectpicker } from 'bootstrap-select';

@inject(Element)
@customElement('bootstrapselect')
export class Bootstrapselect {

    @bindable options = null;
    @bindable selectedvalue = null;
    constructor(el) {
        this.id = el.id;
    }

    attached() {
        var self = this;

        $(`.selectpicker`).selectpicker({

        });

    }
    unattached() {
        $('.selectpicker').selectpicker('destroy');
    }
}