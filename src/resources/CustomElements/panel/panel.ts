
import { bindable, inject } from 'aurelia-framework';
import { Lib } from '../../helpers/lib';
declare let $: JQueryStatic;
export class PanelCustomElement {

    @bindable pTitle : string;
    @bindable pView : any;
    @bindable pId : string= Lib.generateUUID();
    @bindable pCanClose: any = false;
    @bindable pModel: any;
    @bindable pViewModel : any;
    @bindable pIsClosed : boolean= false;
    // @bindable pConfig: any;
    @bindable pCss : any = "col-md-12 col-lg-12";
    constructor( ) {
    }
    bind(ct){
        console.log('Context from panel:', ct);
    }
    attached() {
        this.pIsClosed =false;
        $(document).ready(() => {
            //Toggle fullscreen
            $('#full-' + this.pId).click(function (e) {
                e.preventDefault();

                var $this = $(this);

                if ($this.children('i').hasClass('glyphicon-resize-full')) {
                    $this.children('i').removeClass('glyphicon-resize-full');
                    $this.children('i').addClass('glyphicon-resize-small');
                }
                else if ($this.children('i').hasClass('glyphicon-resize-small')) {
                    $this.children('i').removeClass('glyphicon-resize-small');
                    $this.children('i').addClass('glyphicon-resize-full');
                }
                $(this).closest('.panel').toggleClass('panel-fullscreen');
            });

            // creat eve

        });

    }
    detached() {


    }
    close() {
        if (this.pCanClose==="true" || this.pCanClose=== true) {
            this.pIsClosed=true;
            //todo : create close event
            this.pIsClosed=true;
            $('#' + this.pId).remove();
        }

    }
    

}