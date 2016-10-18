import { customAttribute, bindable, inject } from 'aurelia-framework';
import 'summernote';
import * as moment from 'moment';

declare let $: JQueryStatic;
@inject(Element)
@customAttribute('summernote')
export class SummerNote {
    /**
     *
     */
    @bindable vl;
    constructor(private element) {
        this.element = element;
        console.log("element: " , element);

    }
    attached() {
        console.log('this.value as any: ', (this as any).value);
         $(this.element).val(this.vl);
        ($(this.element) as any).summernote(
            {
                callbacks: {
                    onChange:  (contents, $editable)=> {
                        console.log('onChange:', contents, $editable);
                         $(this.element).val(contents);
                         console.log(" from callback: ", $(this.element).val());
                       // fireEvent( $(this.element), 'input');
                       this.element.dispatchEvent(new Event("change") );

                    }
                }

            }
        )
        //($(this.element) as any).summernote('code', this.vl);
            //.on('change', e => { fireEvent(e.target, 'input'), console.log('event: ', e) });
        //let dateControl = new Date(this.vl);

       // ($(this.element) as any).summernote('code', this.vl);
        //$(this.element).val(this.vl);


    }
    detached() {
        ($(this.element) as any).summernote('destroy')

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