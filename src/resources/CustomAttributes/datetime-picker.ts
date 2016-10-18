import { customAttribute, bindable, inject } from 'aurelia-framework';
import 'datetimepicker';
import * as moment from 'moment';

declare let $: JQueryStatic;
@inject(Element)
@customAttribute('datetime-picker')
export class DateTimePicker {
    /**
     *
     */
    @bindable vl;
    constructor(private element: Element) {
        this.element = element;

    }
    attached() {
        console.log('this :', this);
        ($(this.element) as any).datetimepicker(
            {

            }
        )
            .on('dp.change', e => { fireEvent(e.target, 'input'), console.log('event: ', e) });
        let dateControl:Date = new Date(this.vl)  ;
        dateControl.setHours((dateControl.getHours() -7)); 
        $(this.element).val(moment(dateControl).format('MM/DD/YYYY HH:MM:ss'));


    }
    detached() {
        ($(this.element) as any).datetimepicker('destroy')
            .off('dp.change');
    }

}




function createEvent(name) {
    var event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
}

function fireEvent(element, name) {
    var event = createEvent(name);
    element.dispatchEvent(event);
}